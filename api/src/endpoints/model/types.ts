
import { Document , Model } from "mongoose"
export const metadata_keys = [ "description", "title", "author" ]
export interface MetadataInterface {
	active : Boolean,
	author : String,
	created : Date,
	description : String,
	modified ?: Array<Date>,
	title : String,
	tags ?: Array<String>,
	repo ?: Array<String>
}
export const content_keys = [ "body", "metadata" ]
export interface ContentInterface {
	body : String,
	metadata : MetadataInterface,
}

export interface ContentDocument extends ContentInterface, Document{};
export interface ContentModel extends Model<ContentDocument>{};
