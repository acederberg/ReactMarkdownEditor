import { Schema } from "mongoose"

const metadata_schema_args = {
        active : Boolean,
	author : String,
        created : Date,
        description : String,
        modified : {
		type : [Date],
		required : false
	},
        title : String,
        tags : {
		type : [String],
		required : false
	},
        repo : {
		type : [String],
		required : false      
	}
} 


export const content_schema = new Schema( {
	content : String,
	metadata : metadata_schema_args
} )
