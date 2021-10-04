
import { Document , Model } from "mongoose"

export interface MetadataInterface {
	active : Boolean,
	created : Date,
	description : String,
	modified ?: [ Date ],
	title : String,
	tags :? [ String ],
	repo :? [ String ]
}
export interface ContentInterface {
	body : String,
	metadata : MetadataInterface,
}

export interface ContentDocument extends ContentInterface, Document;
export interface ContentModel extends Model< ContentDocument >;
