import create_app from './server'
import create_db from './db'
import { markdown_get } from './endpoints/endpoints'
import { create_endpoint, create_endpoint_default_args as args } from './endpoints/create_endpoint'

const app = create_app()
const db = create_db()

const markdown = '/markdown/'

let get_markdown = create_endpoint( markdown_get, args ) 
app.get( markdown, 
	( request, result ) => get_markdown( request, result )
)

