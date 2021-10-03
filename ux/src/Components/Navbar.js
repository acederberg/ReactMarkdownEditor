import { get_markdowns } from './fetchMarkdown.js'
import { Component } from 'react'

class NavMenu extends Component { 
	
	constructor( props ){
		super( props )
		this.state = { loading : true }
	}
	setChildren = ( data ) => {
		console.log( 'Setting children' )
		console.log( data )
		this.children = Object.keys( data ).map( key => {
			const filename = data[ key ].filename
			return <li className = "nav-item" key = { key }><a className = "nav-link" href = { data[ key ].filename }>{ filename.split('.')[0].toUpperCase() }</a></li>
		} )
		this.setState( { loading : false } )
	}
	componentDidMount(){
		get_markdowns( this.setChildren ).catch( () => this.children = null )
	}
	render(){ 
		console.log( 'rendering...' )
		return (
		<div className = "collapse navbar-collapse" id = "markdowns" { ...this.props }>
			<ul className = "navbar-nav ms-auto" >
				{ this.children ? this.children : <li>No articals.</li> }
			</ul>
		</div>
	) }
}

export default class Navbar extends Component{
	constructor( props ){
		super( props )
		this.state = { hidden : true }
	}
	onClick = () => this.setState( ( state ) => { 
		console.log( this.state )
		const hidden = !state.hidden
		return { hidden : hidden } 
	} ) 
	render(){
		// navbar with a dark background and a dark theme.
		// `navbar-expand-lg` will be used to  make will make the `collapse` divs collapse when the screen is lss than large.
		// the `ms-auto` is used to make the `ul` go to the right side of the screen
		return ( <>
			<nav className = "navbar navbar-expand-lg bg-light" { ...this.props } >
				<div className = "container">
					<a href = 'https://github.com/acederberg' className = "navbar-brand">Github</a>
					<a href = 'https://LinkedIn.com' className = "navbar-brand">LinkedIn</a>
					<button
						className = "navbar-toggler"
						type = "button"
						onClick = { this.onClick }
					>
						<span className = "navbar-dark navbar-toggler-icon"></span>
					</button>
					<NavMenu style = {{ display : this.state.hidden ? 'none' : 'block' }}/>
				</div>
			</nav> 
		</> )
	}
}
