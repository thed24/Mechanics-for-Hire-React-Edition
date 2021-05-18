import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import LoginNavBar from "./components/loginNavBar";
import "./generic.css";

const userUrl = `http://localhost:3000/users`;
const authUrl = `http://localhost:3000/auth`;

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [userType, setUserType] = useState("");
  const [show, setShow] = useState("");

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();

    axios.get(userUrl).then((res) => {
      const user = res.data.users.find((user) => user.email === email);
      if (!user) {
        axios.post(userUrl, { name, email, password, userType }).then(() => {
          axios.post(authUrl, { email, password });
          localStorage.setItem("currentUser", JSON.stringify(user));
        });
      } else {
        setShow(true);
      }
    });
  }

  return (
    <>
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Error! Email already exists</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          The email you are trying to register already exists within our system,
          try again.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Okay
          </Button>
        </Modal.Footer>
      </Modal>

      <div className="Auth">
        <LoginNavBar></LoginNavBar>
        <Form onSubmit={handleSubmit}>
          <h4> Please register below</h4>
          <Form.Group size="lg" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              autoFocus
              type="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group size="lg" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              autoFocus
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group size="lg" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group size="lg" controlId="userType">
            <Form.Label>User Type</Form.Label>
            <Form.Control
              as="select"
              value="User"
              onChange={(e) => setUserType(e.target.value)}
            >
              <option value={userType}>User</option>
              <option value={userType}>Mechanic</option>
            </Form.Control>
          </Form.Group>
          <Button block size="lg" type="submit" disabled={!validateForm()}>
            Register
          </Button>
        </Form>
      </div>
    </>
  );
}
