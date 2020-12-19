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
    if (new Date().getDay() === 6) {
      this.setState({
        thursdayCounter: (this.state.thursdayCounter += 1),
      });
    }
  }

  test = (event) => {
    axios
      .post('/send')
      .then((response) => {
        console.log('post successful', response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  test2 = (event) => {
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

  addone = (event) => {
    this.setState({
      thursdayCounter: this.state.thursdayCounter + 1,
    });
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
          Off Week? {''} {this.state.thursdayCounter}
        </p>
        <button onClick={this.test}>Here you go</button>
        <button onClick={this.test2}>Here you go2</button>
        <button onClick={this.addone}>Here you go3</button>
      </div>
    );
  }
}

export default App;
