import create_app from './server'
import create_db from './db'

import endpoints from './endpoints/endpoints'
import consume_endpoints from './endpoints/consume_endpoints'


const app = create_app()
const db = create_db()

consume_endpoints( app, endpoints )

