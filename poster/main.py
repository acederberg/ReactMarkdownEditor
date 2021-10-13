import requests
from json import load

_URI = 'http://127.0.0.1:9001'
URI = f'{_URI}/markdown'

def main( callback = None ):
    with open( 'tests.json' , 'r' ) as file: data = load( file )
    
    # Get all collections
    collections = requests.get( f'{_URI}/collections' ).json()

    # Fill each collection with test data
    posts = (
        requests.post( URI, json = { 'collection' : collection, **item }
        )
        for item in data
        for collection in collections
    ) 
    return posts if callback is None else callback( posts )

data = main()
#print( *data, sep = '\n' )
print ( *( d.content for d in data ), sep = '\n' )
