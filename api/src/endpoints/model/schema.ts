import { Schema } from "mongoose"

const metadata_schema_args = {
        active : {
		type : Boolean,
		required : true
	},
	author : {
		type : String,
		required : true
	},
        created : {
		type : Date,
		required : true
	},
        description : {
		type : String,
		required : true
	},
        modified : {
		type : [Date],
		required : false
	},
        title : {
		type : String,
		required : true
	},
        tags : {
		type : [String],
		required : false
	},
        repo : {
		type : String,
		required : false      
	}
} 


export const content_schema = new Schema( {
	body : {
		type : String,
		required : true
	},
	metadata : {
		type : metadata_schema_args,
		required : true
	}
} )
