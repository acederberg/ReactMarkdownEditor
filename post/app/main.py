from flask import Flask, request, make_response, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from uuid import uuid4
from os import listdir, remove
from os.path import join, dirname

RESOURCES = '.resources'
name, filename, content = 'name', 'filename', 'content'

bad_request = lambda : make_response( 'Cannot make coffee in a teapot', 418 )
good_request = lambda : make_response( 'OK', 200 )
requires_content = lambda : make_response( 'RequestRequiresContent', 406 )
mkpath = lambda name : join( RESOURCE, f'{ filename }.md' )

def fix_data( data ):
    if name not in data and filename not in data: return bad_request()
    if content not in data: return requires_content()
    if filename not in data and name in data: data[ filename ] = f'{ data[ name ] }.md' if name in data else uuid4()

def write_content( data, override = False ):
    filepath = join( RESOURCES, data[ filename ] )
    if override : remove( filepath )
    print( filepath )
    with open( filepath , 'w' ) as file: file.write( data[content] )

def create_everything():

    app = Flask( __name__ )
    app.config[ 'SQLALCHEMY_DATABASE_URI' ] = f"sqlite:///{ join( dirname( __file__ ), 'db.sqlite') }" 
    app.config[ 'SQLALCHEMY_TRACK_MODIFICATIONS' ] = False
    print ( app.config[ 'SQLALCHEMY_DATABASE_URI' ] )

    db = SQLAlchemy( app )
    ma = Marshmallow( app )

    class registry( db.Model ):
        # Note that in the portfolio this will be used by the metadata server to find the file.
        id = db.Column( db.Integer, primary_key = True )
        filename = db.Column( db.String( 50 ), unique = True )

    class serial( ma.Schema ):
        class Meta: fields = ( 'id', 'filename' )
        
    serialize_many = serial( many = True )
    serialize_one = serial()

    @app.route( '/new/', methods = [ 'GET' ] )
    def show_all():
        "content will be pushed out by nginx, we don't have to worry about that here."
        data  = registry.query.all()
        return serialize_many.dumps( data )
       
    @app.route( '/new/<filename>/', methods = [ 'GET' ] )
    def show_one( filename = None ):
        print( filename )
        data = registry.query.filter( registry.filename == filename ).first()
        return serialize_one.dumps( data ) if data else bad_request()

    @app.route( '/new/', methods = [ 'PUT' ] )
    def modify():
        "Replace a previous version of the markdown"
        data = request.get_json()
        fix_data( data )
        print( data ) 
        doc = registry.query.filter( registry.filename == data[ filename ] ).first()
        if not doc : return bad_request()
        write_content( data, override = True )
        return good_request()

    @app.route( '/new/', methods = [ 'POST' ] )
    def process(): 
        data = request.get_json( force = True )
        fix_data( data )
        write_content( data )

        r = registry( filename = data[ filename ] )
        db.session.add( r )
        db.session.commit()

        return good_request()

    
    return { 
            'app' : app, 
            'db' : db, 
            'ma' : ma 
    }

def create_app(): return create_everything()[ 'app' ]
