import { model } from 'mongoose'

import { content_schema } from './schema'
import { ContentDocument } from './types'

// Exports a function so that we make create models for the individual collections of documents.
export function content_model( name : string ){ return model<ContentDocument>( name, content_schema ) }

export const models = {
	// Add new collections here
 	test_articals : content_model( 'test_articals' ),
	python_articals : content_model( 'python_articals' ),
	typescript_articals : content_model( 'typescript_articals' ),
	main_articals : content_model( 'main_articals' )
}

