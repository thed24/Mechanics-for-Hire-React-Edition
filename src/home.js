import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import LoginNavBar from "./components/loginNavBar";
import AdvertisementTable from "./components/advertisementTable";
import axios from "axios";
import "./generic.css";

const advertisementUrl = `http://localhost:3000/advertisements`;

export default function Home() {
  const currentUser = localStorage.getItem("currentUser")
    ? JSON.parse(localStorage.getItem("currentUser"))
    : null;
  const [name, setName] = useState("");
  const [booked, setBooked] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [show, setShow] = useState("");
  const [id, setId] = useState("");

  function openModalForUpdate(advert){
    setId(advert._id);
    setBooked(advert.booked);
    setShow(true);
  }
  
  function validateForm() {
    return name?.length > 0 && timeSlot?.length > 0;
  }

  function validateButton() {
    return currentUser;
  }

  function handleSubmit() {
    if (id) {
      axios.put(advertisementUrl, {
        _id: id,
        name,
        timeSlot,
        booked,
        user: currentUser._id,
      });
    } else {
      axios.post(advertisementUrl, {
        name,
        timeSlot,
        booked: false,
        user: currentUser._id,
      });
    }

    setBooked(null);
    setName(null);
    setId(null);
    setTimeSlot(null);
    setShow(false);
  }

  return (
    <>
      <div className="Login">
        <LoginNavBar></LoginNavBar>
        <h2> Welcome to Mechanics for Hire! </h2>
        <div className="TableHolder">
          <AdvertisementTable
            editAdvert={openModalForUpdate}
          ></AdvertisementTable>
          <Button
            block
            size="lg"
            type="submit"
            onClick={() => setShow(true)}
            disabled={!validateButton()}
          >
            Create a new advertisement
          </Button>
        </div>
      </div>

      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>New Advertisement</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
            <Form.Label>Timeslot</Form.Label>
            <Form.Control
              autoFocus
              type="email"
              value={timeSlot}
              onChange={(e) => setTimeSlot(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={() => handleSubmit()}
            disabled={!validateForm()}
          >
            Okay
          </Button>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
