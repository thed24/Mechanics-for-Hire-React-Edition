import { Nav, Navbar } from "react-bootstrap";
import React from "react";

export default class LoginNavBar extends React.Component {
  constructor() {
    super();
    this.state = {
      currentUser: localStorage.getItem("currentUser")
        ? JSON.parse(localStorage.getItem("currentUser"))
        : null,
    };
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
            {this.state.currentUser ? this.state.currentUser.name : "Guest"}
          </Nav.Link>
        </Nav>
      </Navbar>
    );
  }
}
