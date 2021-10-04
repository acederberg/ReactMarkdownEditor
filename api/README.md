# Markdown API

I have decided that I would be nice to build the markdown API as one single unit just for the sake of simplicity and not having to fetch information from multiple databases - this will keep the data coherent. 

## Request Template

`Content-type` is `application/json`. 

Filters are specified in the `filter` field but are not allowed for `DELETE` or `POST` requests. They may include any of the keys contained in the document schema.
The `_id` field may be included with all requests besides the post requests as post requests are made to create resources. Will take precidense when provided alongside `filter`. 
The `catagory` field may be used to specify the catagory.
The `random` field may be included an may use a `filter` parameter.
Here is the basic template

~~~json
{
	"catagory" : <String, name of collection>,
	"filter" : <Object, metadata fields. Tags look for containment of atleast on tag. Not used on `DELETE`.>,
	"_id" : <ObjectId.__str__>,
	"_id_only" : <Boolean, only for GET requests>,
	"max_count" : <Number, only for GET and PUT requests>,
	"random" : <Boolean, very useful when combined with filter. GET requests only.>
}
~~~

## Schema

We will only be concerned with a single document. It is the following:

~~~json
{
	"_id" : <ObjectId>,
	"body" : <String, artical content>,
	"metdata" : {
		"active" : <Boolean, artical status>,
		"created" : <Date, date created>,
		"description" : <String, short description of the artical>
		"modified" : [ <Date, modified date> ],
		"title" : <String, artical title>,
		"tags" : ?[<String, artical title>],
		"author" : <String>,
		"repo" : ?<String, url>
	}
}
~~~

each catagory will be its own collection. Since this will be a blog there is no need for multiple users.

## Endpoints

1. `/latest/` -- Get the latest articals.
	* `GET` -- **Parameters: `<String> catagory`, `<Object> filter`, `<Boolean> _id_only`, `<Number> maxcount`, `<Boolean> random`**. The most recent articals as a list of `ObjectIds`.
2. `/metadata/` -- Requests to modify the metadata for each artical.
	* `GET` -- **Parameters: `<String> catagory`, `<Object> filter`, `<ObjectId> _id`, <Boolean> _id_only`, `<Number> maxcount`.**. Get the metadata for the latest articals by default. Otherwise get data from the optional specified catagory with the optional filter statement. 
	* `PUT` -- **Parameters: `<String> catagory`, `<Object> filter`, `<ObjectId> _id`**. Modify the metadata with the specified `_id`, `catagory`, or `filter`. `filter` and `catagory` may be used together however using `_id` in combination with either will only use the `_id`.
3. `/markdown/` -- Requests for markdowns.
	* `GET` -- **Parameteres: `catagory`, `<ObjectId> _id`, `<Boolean> random`.** Get an artical by its `_id` or grab a random artical. `filter` can be specified in the `filter`.
	* `POST` -- **Parameters: Catagory and all schema keys.** Create artical and metadata for an artical.
	* `PUT` -- **Parameters: `<String> catagory`, `<Object> filter`, `<ObjectId> _id`.** Modify an existing markdown and the metadata.
	* `DELETE` -- **Parameters: `<ObjectId> _id`.** Remove an artical and its metadata by `_id`.

## Implementation

I think either `express` with `typescript` and `mongoose` or `Flask` with `PyMongo` is an option. The problem with typescript is that I am still a bit of a noob. However it would be good for some larger projects I plan on implementing. Since there is only one schema that is needed I think it will be relatively quick to implement.
