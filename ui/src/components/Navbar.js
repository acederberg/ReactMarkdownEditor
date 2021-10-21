import { Container, Navbar } from 'react-bootstrap'
import Login from './auth/login'

const MyNavbar = () => <Navbar bg = 'primary'>
	<Container>
		<Login/>	
	</Container>
</Navbar>

export default MyNavbar;
