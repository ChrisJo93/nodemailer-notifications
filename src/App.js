import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {
  state = {
    email: '',
    sendMail: false,
    thursdayCounter: 0,
  };

  // Use a counter for number of thursdays. Every 1 thursday, send the email. Every 2 thursday set "send email" to false.

  componentDidMount() {
    if (new Date().getDay() === 0) {
      axios.post('/send/counter');
    }
    axios
      .get('/send')
      .then((response) => {
        console.log('in cient get', response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  sendEmail = (event) => {
    axios
      .post('/send')
      .then((response) => {
        console.log('post successful', response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  addEmail = (event) => {
    axios
      .post('/send/add', this.state.email)
      .then((response) => {
        console.log('im a fucking boss', response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  addThursdayCounter = (event) => {
    this.setState({ thursdayCounter: this.state.thursdayCounter + 1 });
  };

  resetCounter = (event) => {
    this.setState({ thursdayCounter: 0 });
  };

  handleInputChangeFor = (propertyName) => (event) => {
    this.setState(
      {
        [propertyName]: [event.target.value],
      },
      () => {
        console.log(this.state.email);
      }
    );
  };

  render() {
    return (
      <div className="App">
        <input
          onChange={this.handleInputChangeFor('email')}
          value={this.state.email}
          type="text"
          placeholder="add email"
        />
        <p>{new Date().getDay().toString()}</p>
        <p>
          Send mail today? {''} {this.state.sendMail.toString()}
        </p>
        <p>
          Thursday Counter {''} {this.state.thursdayCounter}
        </p>
        <button onClick={this.sendEmail}>Send Email</button>
        <button onClick={this.addEmail}>Add Email</button>
        <button onClick={this.addThursdayCounter}>Add Counter</button>
        <button onClick={this.resetCounter}>Reset</button>
      </div>
    );
  }
}

export default App;
