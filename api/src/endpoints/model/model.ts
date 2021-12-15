import { model } from 'mongoose'

import { content_schema } from './schema'
import { ContentDocument } from './types'

// Exports a function so that we make create models for the individual collections of documents.
export function content_model( name : string ){ return model<ContentDocument>( name, content_schema ) }

export const models = {
	// Add new collections here
 	test_articles : content_model( 'test_articles' ),
	python_articles : content_model( 'python_articles' ),
	typescript_articles : content_model( 'typescript_articles' ),
	main_articles : content_model( 'main_articles' )
}

