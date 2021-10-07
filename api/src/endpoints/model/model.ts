import { model } from 'mongoose'

import { content_schema } from './schema'
import { ContentDocument } from './types'

// Exports a function so that we make create models for the individual collections of documents.
export function content_model( name : string ){ return model<ContentDocument>( name, content_schema ) }

export const models = {
       	tests : content_model( 'A' ),
	python : content_model( 'B' )
}

