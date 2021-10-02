# Syntax Highlighting test

This is a test to see if syntax highlighting is functioning correctly. The following is a version of the code used to render the markdowns on this website. Most of this code is directly from the documentation as mentioned in the first line.

~~~jsx
// Syntax highlighting plugin is verbatim from the docks. https://github.com/remarkjs/react-markdown
import ReactDom from react-dom
import ReactMarkdown from react-markdown
import { Prism as SyntaxHighlighter } from react-syntax-highlighter
import { dark } from react-syntax-highlighter/dist/esm/styles/prism
import get_path from ./fetchMarkdown.js

export default async function RenderMarkdown( filename, into ){
	// Get data. Make markdown with highlighyinh
	const data = await get_path( filename, ( raw_markdown ) => <ReactMarkdown
		components={{
			code({node, inline, className, children, ...props}) {
				const match = /language-(\w+)/.exec(className || )
				return !inline && match ? (
					<SyntaxHighlighter
						children={String(children).replace(/\n$/, )}
						style={dark}
						language={match[1]}
						PreTag=div
						{...props}
					/>
					) : (
					<code className={className} {...props}>
						{children}
					</code>
				)
			}
		}}
		children = { raw_markdown }
	></ReactMarkdown>,
	)
	ReactDom.render( data, into )
}
~~~ 

The following is a test to see if syntax highlighting works with python:

~~~python
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
~~~

yaml:

~~~yaml
version : '3.7'
services :
  ux:
    build :
      context : '.'
      dockerfile : './Dockerfile.dev'
    ports :
      - target : 8000
        published : 8000
        protocol : 'tcp'
    volumes :
      - type : 'bind'
        source : '.'
        target : '/app/'
~~~

We can also write our code blocks in a larger font by indenting:

    docker compose --file docker-compose.dev.yaml up

this is especially helpful for writing single lines, e.g.

    curl -X POST 127.0.0.1/new/ -H 'Content-type: application/json' -d '{"name":"t