import requests
from json import load

_URI = 'http://127.0.0.1:9001'
URI = f'{_URI}/markdown'

def getHeader():
    res = requests.post( 
        "https://dev-xr7t2jq8.us.auth0.com/oauth/token", 
        json = { 
            "client_id" : "oHLtHhkc0op7Bgjb31wAK73qwrHZ2YpW",
            "client_secret" : "t0x8modG4Ao7zHSq-Kt8yxNv81viiFnnuNZPY6gyO0R0XkF1W9D6QFaektTzZBzL",
            "audience" : "http://localhost:9001",
            "grant_type" : "client_credentials" 
        } 
    )
    return { 'Authorization' : f'Bearer { res.json()[ "access_token" ] }' }

def main( callback = None ):
    with open( 'tests.json' , 'r' ) as file: data = load( file )
    
    # Get all collections
    collections = requests.get( f'{_URI}/collections' ).json()
    Header = getHeader()

    # Fill each collection with test data
    posts = (
        requests.post( 
            URI, 
            json = { 'collection' : collection, **item },
            headers = Header
        )
        for item in data
        for collection in collections
    ) 
    return posts if callback is None else callback( posts )

data = main()
#print( *data, sep = '\n' )
print ( *( d.content for d in data ), sep = '\n' )
