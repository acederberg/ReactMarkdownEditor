import create_app from './server'
import create_db from './db'
import { markdown_get } from './endpoints/endpoints'
import create_endpoint from './endpoints/create_endpoint'

const app = create_app()
const db = create_db()

const markdown = '/markdown/'

app.get( markdown, create_endpoint( markdown_get ) )

