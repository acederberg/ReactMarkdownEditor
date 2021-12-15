import { Container, Navbar, Nav } from 'react-bootstrap'
import Login from './auth/login'

export default function Navbar_( { withLogin } ){
	return <Navbar bg = 'light' expand = 'md' >
		<Container>
			<Navbar.Brand>HolyPortfolio.com</Navbar.Brand>
			<Navbar.Collapse id = 'etc'>
				<Nav className = 'me-auto' >
					<Nav.Link href = '/home'>Home</Nav.Link>
					<Nav.Link href = '/projects'>Projects</Nav.Link>
					<Nav.Link href = '/collections'>Articles</Nav.Link>
				</Nav>
			</Navbar.Collapse>
			{ withLogin && <Login/> }
			<Nav>
				<Navbar.Toggle aria-controls = 'etc' style = {{ marginLeft : '5px' }}/>
			</Nav>
		</Container>
	</Navbar>
}

