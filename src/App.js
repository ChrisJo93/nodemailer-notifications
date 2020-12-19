import React, { Component } from 'react';
import HeaderComponent from './Components/HeaderComponent/HeaderComponent';
import NavComponent from './Components/NavComponent';
import MainPageComponent from './Components/MainPageComponent';
import FooterComponent from './Components/FooterComponent';
import axios from 'axios';

class App extends Component {
  state = {
    email: {
      name: 'Ayo pimp',
      email: 'Johnny.C.Alexander@gmail.com',
      message: 'Ayo pimp!!!',
    },
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

  render() {
    return (
      <div className="App">
        <HeaderComponent />
        <NavComponent />
        <button onClick={this.test}>Here you go</button>
        <MainPageComponent />
        <FooterComponent />
      </div>
    );
  }
}

export default App;
