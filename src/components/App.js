import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import logo from '../logo.svg';
import '../styles/App.css';
import Articles from './Articles';
import Header from './Header';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Articles />
      </div>
    );
  }
}

export default App;
