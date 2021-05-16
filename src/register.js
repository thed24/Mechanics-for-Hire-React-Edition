import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import "./generic.css";
import LoginNavBar from "./components/loginNavBar";

const userUrl = `http://localhost:3000/users`;

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [userType, setUserType] = useState("");
  const [loggedInUser, setLoggedInUser] = useState("");
  const [show, setShow] = useState("");

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    const user = {
      email,
      password,
      name,
      userType,
    };

    axios({ method: "get", url: userUrl, params: { email } }).then((res) => {
      console.log(res);
      if (res.data.users.length === 0) {
        axios({ url: userUrl, body: user }).then(() => {
          setLoggedInUser(email);
        });
      } else {
        setShow(true);
      }
    });
  }

  return (
    <>
      <Modal show={show} onHide={setShow}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={setShow}>
            Close
          </Button>
          <Button variant="primary" onClick={setShow}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="Auth">
        <LoginNavBar currentUser={loggedInUser}></LoginNavBar>
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
              defaultValue="User"
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
