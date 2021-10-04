import ViewMarkdown from './ViewMarkdown.js' 
// This will return a dummy div since the `Route` method requires this.
// It really just renders the markdown into the wrapper, which is declared in index.js
const View = ({match:{params:{filename}}}) => {

        let wrapper = document.getElementById( 'wrapper' )
        ViewMarkdown( filename, wrapper )
        return <div>This is a test</div>

}

export default View