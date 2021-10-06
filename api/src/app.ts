import create_app from './server'
import create_db from './db'
import { markdown_get, markdown_post, markdown_all } from './endpoints/endpoints'
import { create_endpoint, create_endpoint_default_args as args } from './endpoints/create_endpoint'

const app = create_app()
const db = create_db()

const markdown = '/markdown/'

const markdown_args = {
	can_be_empty : true,
	requires_collection : true
}
let get_markdown = create_endpoint( markdown_get, markdown_args ) 

app.get( markdown, 
	( request, result ) => get_markdown( request, result )
)

let post_markdown = create_endpoint( markdown_post, args )
app.post( 
	markdown,
	( request, result ) => post_markdown( request, result )
)
