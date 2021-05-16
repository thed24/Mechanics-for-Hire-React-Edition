import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import "./generic.css";

export default function Home() {
    return (
        <div className="Login">
            <Navbar className="Nav" bg="dark" variant="dark">
                <Navbar.Brand href="/">Home</Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link href="/login">Login</Nav.Link>
                    <Nav.Link href="/register">Register</Nav.Link>
                </Nav>
            </Navbar>
            <h2> Welcome to Mechanics for Hire! </h2>
        </div>
    );
}