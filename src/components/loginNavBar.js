import { Nav, Navbar } from "react-bootstrap";

export default function LoginNavBar(props) {
    console.log(props.currentUser);
    return (
        <Navbar className="Nav" bg="dark" variant="dark">
            <Navbar.Brand href="/">Home</Navbar.Brand>
            <Nav className="mr-auto">
                <Nav.Link href="/login">Login</Nav.Link>
                <Nav.Link href="/register">Register</Nav.Link>
            </Nav>
            <Nav>
                <Nav.Link> 
                    Logged in as {props.currentUser ? props.currentUser : "Guest"} 
                </Nav.Link>
            </Nav>
        </Navbar>
    );
}