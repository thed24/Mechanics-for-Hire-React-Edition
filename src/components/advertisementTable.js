import { Table, Button } from "react-bootstrap";
import React from "react";
import axios from "axios";

const advertisementUrl = `http://localhost:3000/advertisements`;

export default class AdvertisementTable extends React.Component {
  constructor() {
    super();
    this.state = {
      advertisements: [],
      currentUser: localStorage.getItem("currentUser")
        ? JSON.parse(localStorage.getItem("currentUser"))
        : null,
    };
  }

  componentDidMount() {
    axios.get(advertisementUrl).then((res) => {
      this.setState({
        advertisements: res.data.advertisements,
      });
    });
  }

  render() {
    return (
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Advertisement name</th>
            <th>Timeslot</th>
            <th>Book timeslot</th>
            <th>Admin Options</th>
          </tr>
        </thead>
        <tbody>
          {this.state.advertisements.map((advert) => {
              console.log(advert)
            return (
              <tr>
                <td>{advert.name}</td>
                <td>{advert.timeSlot}</td>
                <td>{advert.booked ? "Not available" : <Button> Book Now </Button>}</td>
                <td>
                  {advert.user?.email === this.state.currentUser.email 
                    ? (<>
                        <Button id={advert._id}> Edit </Button> <></> 
                        <Button id={advert._id}> Delete </Button>
                    </>) 
                    : ("N/A")
                  }
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    );
  }
}
