import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {
  state = {
    email: '',
    sendMail: false,
  };

  componentDidMount() {
    // if (new Date().getDay() === 0) {
    //   axios.post('/send/counter');
    // }
    axios
      .get('/send')
      .then((day) => {
        console.log('in client get', day.data);
        if (day.data === 0) {
          this.sendEmail();
        }
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
      </div>
    );
  }
}

export default App;
