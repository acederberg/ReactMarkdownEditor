import { model } from 'mongoose'

import { content_schema } from './schema'
import { ContentDocument } from './types'

// Exports a function so that we make create models for the individual collections of documents.
export function content_model( name : string ){ model<ContentDocument>( name, content_schema ) }

export default {
       	tests : content_model( 'tests' ),
	python : content_model( 'python' )
}

