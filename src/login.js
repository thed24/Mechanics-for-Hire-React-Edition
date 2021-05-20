import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import LoginNavBar from "./components/loginNavBar";
import "./generic.css";

const authUrl = `http://localhost:3000/auth`;
const userUrl = `http://localhost:3000/users`;

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();

    axios.post(authUrl, { email, password }).then((res) => {
      if (res.status === 200) {
        axios.get(userUrl).then((res) => {
          const user = res.data.users.find((user) => user.email === email);
          localStorage.setItem("currentUser", JSON.stringify(user));
        });
      }
    });
  }

  return (
    <div className="Auth">
      <LoginNavBar></LoginNavBar>
      <Form onSubmit={handleSubmit}>
        <h4> Please log-in</h4>
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
        <Button block size="lg" type="submit" disabled={!validateForm()}>
          Login
        </Button>
      </Form>
    </div>
  );
}
