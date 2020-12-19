import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {
  state = {
    email: '',
  };
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

  render() {
    return (
      <div className="App">
        <input
          onChange={this.handleInputChangeFor('email')}
          value={this.state.email}
          type="text"
          placeholder="add email"
        />
        <button onClick={this.test}>Here you go</button>
        <button onClick={this.test2}>Here you go2</button>
      </div>
    );
  }
}

export default App;
