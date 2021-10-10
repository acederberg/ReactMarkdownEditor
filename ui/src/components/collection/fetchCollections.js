const uri = `${ process.env.REACT_APP_API_URI }/collections/` 
const getContent = () => fetch( uri )
	.then( data => data.json() )
	.catch( err => console.log( `fetch error@uri=${uri}:\n ${err}` ) )

export default getContent

