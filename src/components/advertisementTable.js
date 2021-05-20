import { Table, Button, } from "react-bootstrap";
import React, { Component } from "react";
import axios from "axios";

const advertisementUrl = `http://localhost:3000/advertisements`;
const advertisementByIdUrl = `http://localhost:3000/advertisements/`;

function deleteEntry(advert) {
  axios.delete(advertisementByIdUrl + advert._id);
}

function bookEntry(advert) {
  axios.put(advertisementUrl, {
    _id: advert._id,
    name: advert.name,
    timeSlot: advert.timeSlot,
    booked: true,
    user: advert.user._id,
  });
}

class DeleteButton extends Component {
  handleClick = () => {
    this.props.onDeleteClick(this.props.value);
  };

  render() {
    return <Button onClick={this.handleClick}> Delete </Button>;
  }
}

class EditButton extends Component {
  handleClick = () => {
    this.props.onEditClick(this.props.value);
  };

  render() {
    return <Button onClick={this.handleClick}> Edit </Button>;
  }
}

class BookButton extends Component {
  handleClick = () => {
    this.props.onBookClick(this.props.value);
  };

  render() {
    return <Button onClick={this.handleClick}> Book </Button>;
  }
}

export default class AdvertisementTable extends React.Component {
  constructor(props) {
    super(props);
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
            return (
              <tr>
                <td>{advert.name}</td>
                <td>{advert.timeSlot}</td>
                <td>
                  {advert.booked ? (
                    "Not available"
                  ) : (
                    <BookButton value={advert} onBookClick={bookEntry}> </BookButton>
                  )}
                </td>
                <td>
                  {advert.user?.email === this.state.currentUser.email ? (
                    <>
                      <EditButton value={advert} onEditClick={this.props.editAdvert}> Edit </EditButton>
                      <>{" "}</>
                      <DeleteButton value={advert} onDeleteClick={deleteEntry}> </DeleteButton>
                    </>
                  ) : (
                    "N/A"
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    );
  }
}
