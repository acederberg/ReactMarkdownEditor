import { Container, Navbar, Nav } from 'react-bootstrap'
import Login from './auth/login'

const Navbar_ = () => {
	return <Navbar bg = 'light' expand = 'md' >
		<Container>
			<Navbar.Brand>HolyPortfolio.com</Navbar.Brand>
			<Navbar.Collapse id = 'etc'>
				<Nav className = 'me-auto' >
					<Nav.Link href = '/'>Home</Nav.Link>
					<Nav.Link href = '/projects'>Projects</Nav.Link>
					<Nav.Link href = '/collections'>Articals</Nav.Link>
				</Nav>
			</Navbar.Collapse>
			<Nav>
				<Navbar.Toggle aria-controls = 'etc' style = {{ marginLeft : '5px' }}/>
			</Nav>
		</Container>
	</Navbar>
}
export default Navbar_;
