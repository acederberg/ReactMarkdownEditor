// Should not contain any models.
// Local imports.
import create_app from './server'
import create_db from './db'
// Imports from endpoints.
import { consume_endpoints, content_endpoints } from './endpoints'

// Instantiate the app and the database pool.
const app = create_app()
const db = create_db()

// Set up endpoints
consume_endpoints( app, content_endpoints )

export default app;

