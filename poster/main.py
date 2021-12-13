import requests
import yaml
from os.path import join, abspath, dirname

_URI = 'http://127.0.0.1:9001'
URI = f'{_URI}/markdown'

def getAbsPath( filename ): return abspath( 
    join(
        dirname( __file__ ),
        filename
    )
)

def getYaml( filename ):

    import yaml

    with open( 
            getAbsPath( filename ) 
        ) as file : return yaml.load( 
            file, 
            Loader = yaml.SafeLoader 
        )


def getHeader():

    config = getYaml( 'config.yaml' )

    res = requests.post( 
        config[ 'auth0_token_uri' ],
        json = { 
            field : config[ f'auth0_{field}' ]
            for field  in ( 
                "client_id", 
                "client_secret", 
                "audience", 
                "grant_type" 
            )
        } 
    )

    return { 
        'Authorization' : f'Bearer { res.json()[ "access_token" ] }' 
    }


def main( callback = None ):
   
    content = getYaml( 'content.yaml' )

    # Get all collections
    collections = requests.get( f'{_URI}/collections' ).json()
    header = getHeader()

    # Fill each collection with test data
    posts = (

        requests.post( 
            URI, 
            json = { 'collection' : collection, **item },
            headers = header
        )
        for item in content
        for collection in collections

    ) 
    return posts if callback is None else callback( posts ) 

data = main()


print ( *( d.content for d in data ), sep = '\n' )
