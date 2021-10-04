import create_app from './server'
import create_db from './db'

const app = create_app()
const db = create_db()

app.get('/', ( request, result ) => {
	result.send('It works!')
} )
