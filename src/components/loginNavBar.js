import { Nav, Navbar } from "react-bootstrap";
import React from "react";
import axios from "axios";

const authUrl = `http://localhost:3000/auth`;
export default class LoginNavBar extends React.Component {
  constructor() {
    super();
    this.state = {
      currentUser: null
    };
  }

  componentDidMount() {
    axios.get(authUrl).then((res) => {
      this.setState({
        currentUser: res.data.email,
      });
    });
  }

  render() {
    return (
      <Navbar className="Nav" bg="dark" variant="dark">
        <Navbar.Brand href="/">Home</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="/login">Login</Nav.Link>
          <Nav.Link href="/register">Register</Nav.Link>
        </Nav>
        <Nav>
          <Nav.Link>
            Logged in as{" "}
            {this.state.currentUser ? this.state.currentUser : "Guest"}
          </Nav.Link>
        </Nav>
      </Navbar>
    );
  }
}
