import React, { Component } from 'react';
import Header from './Components/header';
import './App.css';

//-------NPM Packages------\\
import { Button, TextField } from '@material-ui/core';
import axios from 'axios';
import { DateTime } from 'luxon';
import Swal from 'sweetalert2';

class App extends Component {
  state = {
    email: '',
  };

  addEmail = (event) => {
    axios
      .post('/add', this.state.email)
      .then((response) => {
        console.log(`${this.state.email} added`, response);
      })
      .catch((err) => {
        console.log(err);
      });
    Swal.fire(
      'Thanks For Joining!',
      'Check your email for zoom invites.',
      'success'
    );
  };

  stopLoop = (event) => {
    axios
      .post('/stop')
      .then((response) => {
        console.log('loop stopped', response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleInputChangeFor = (propertyName) => (event) => {
    this.setState({
      [propertyName]: [event.target.value],
    });
  };

  render() {
    const date = DateTime.fromISO(new Date().getUTCDate());
    const clearDate = date.toLocaleString(DateTime.DATE_FULL);
    return (
      <div className="formPanel">
        <Header />

        <TextField
          onChange={this.handleInputChangeFor('email')}
          value={this.state.email}
          label="Email"
          type="text"
        />
        <br />
        <p>{clearDate}</p>
        <Button variant="contained" color="primary" onClick={this.addEmail}>
          Submit
        </Button>
        <Button variant="contained" color="primary" onClick={this.stopLoop}>
          Pause
        </Button>
      </div>
    );
  }
}

export default App;
