import React, { Component } from 'react';
import logo from '../logo.svg';
import '../styles/App.css';
import Articles from './Articles';
import Comments from './Comments';
import Topics from './Topics';
class App extends Component {
  render() {
    return (
      <div className="App">
        <Topics />
        <Articles />
        <Comments />
      </div>
    );
  }
}

export default App;
