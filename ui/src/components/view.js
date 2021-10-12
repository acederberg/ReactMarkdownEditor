// Syntax highlighting is verbatim from the docks. https://github.com/remarkjs/react-markdown
import ViewMarkdown from './markdowns/viewMarkdown.js'

// This will return a dummy div since the `Route` method requires this.
// It really just renders the markdown into the wrapper, which is declared in index.js
const View = ({match:{params:{collection, _id}}}) => {

        const wrapper = document.getElementById( 'wrapper' )

        ViewMarkdown( collection, _id, wrapper )
        return <div></div>

}

export default View
