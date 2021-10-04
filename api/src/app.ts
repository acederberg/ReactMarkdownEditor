import create_app from './server'
import create_db from './db'
import { content_model as content } from './model/model'
import { ContentInterface as Content } from './model/types'

const app = create_app()
const db = create_db()

const markdown = '/markdown/'

app.post(markdown, async ( request, result ) => {
	const data = await content.create( request.body )
	console.log( data )
	result.send('It works!')
} )
app.get(markdown, async ( request, result ) => {
	const data = await content.find( request.body )
	console.log( data )
	result.send('This also works!')
} )
