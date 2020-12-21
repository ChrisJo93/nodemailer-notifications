import React, { Component } from 'react';
import axios from 'axios';
import HeaderComponent from './Components/HeaderComponent/HeaderComponent';

class App extends Component {
  state = {
    email: '',
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
    this.setState({
      [propertyName]: [event.target.value],
    });
  };

  render() {
    return (
      <div className="App">
        <HeaderComponent />
        <input
          onChange={this.handleInputChangeFor('email')}
          value={this.state.email}
          type="text"
          placeholder="add email"
        />
        <p>{new Date().toString()}</p>

        <button onClick={this.addEmail}>Add Email</button>
      </div>
    );
  }
}

export default App;
