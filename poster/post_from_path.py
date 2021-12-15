from main import getHeader, _URI
import requests


URI : str = f'{_URI}/markdown/'
fields : tuple = ( 'abs_path', 'collection', 'author', 'description', 'title' )


def getArtical( abs_path : str ) -> str :

    with open( abs_path, "r" ) as file : return ''.join( file.readlines() )


def getJsonFromPath( abs_path : str, collection : str, author : str, description : str, title : str ) -> dict :

    return {
        'body' : getArtical( abs_path ),
        'collection' : collection,
        'metadata' : {
            'author' : author,
            'description' : description,
            'title' : title
        }
    }


def getJsonFromUserInput( presets : dict = {}, no_ask : bool = None ) -> dict : 

    inputs : dict = presets.copy()
    user : dict = {
        field : value
        for field in fields
        for value in (
            input( f'{field}:{ 20 * " " }'[ 0 : 20 ] ),
        )
        if value
    } if not no_ask else {}

    print( user )
    inputs.update( user )

    print( inputs )

    data : dict = getJsonFromPath( **inputs )
    return data


def postJsonFromUserInput( presets : dict = {}, verbose : bool = None, no_ask : bool = None ) -> None :


    data = getJsonFromUserInput( 
        presets = presets,
        no_ask = no_ask
    )
    
    if verbose :
        print( 100 * '=' )
        print( f'{ data = }' )
        print( 100 * '=' )
        print( 'posting...' )
   
    print( URI )
    result = requests.post(
        URI,
        json = data,
        headers = getHeader()
    )

    print( f'{ result.status_code } { result.reason }' )

    return result
    


if __name__ == '__main__' :

    presets : dict = {
        "abs_path" : "/mnt/c/Dev/notes/AboutThePortfolio.md",
        "author" : "tester",
        "collection" : "main_articals",
        "description" : "a test",
        "title" : "test"
    }

    result = postJsonFromUserInput( 
        presets = presets,
        no_ask = True,
        verbose = True
    )
