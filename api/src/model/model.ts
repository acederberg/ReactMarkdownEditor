import { model } from 'mongoose'

import { content_schema } from './schema'
import { ContentDocument } from './types'

export const content_model = model<ContentDocument>( "Session", content_schema )


