import { Container, Navbar, Nav } from 'react-bootstrap'
import Login from './auth/login'

export default function Navbar_( { withLogin } ){
	return <Navbar bg = 'light' expand = 'md' >
		<Container>
			
			<Navbar.Collapse id = 'etc'>
		
				<Nav className = 'me-auto' >
					<Nav.Link href = '/home'>About</Nav.Link>
					<Nav.Link href = '/projects'>Projects</Nav.Link>
					<Nav.Link href = '/collections'>Articles</Nav.Link>
				</Nav>
				
				<Nav className = 'justify-content-end' style = {{ width : "100%", paddingRight : "10%", fontSize : "small" }} >
					<Nav.Link href = 'https://github.com/acederberg'>Github</Nav.Link>
					<Nav.Link href = 'https://www.linkedin.com/in/adrian-cederberg-b453571b9'>LinkedIn</Nav.Link>
				</Nav>
				{ withLogin && <Login/> }

			</Navbar.Collapse>


			<Nav>
				<Navbar.Toggle aria-controls = 'etc' style = {{ marginLeft : '5px' }}/>
			</Nav>

		</Container>
	</Navbar>
}

