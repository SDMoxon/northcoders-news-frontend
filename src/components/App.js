import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import '../styles/App.css';
import Articles from './Articles';
import Header from './Header';

class App extends Component {
  render() {
    return (
      <div className='App'>
        <Header />
        <Router>
          <Switch>
            <Route exact path="/" component={Articles} />
            <Route path="/articles/:id" component={Articles} />
            <Route component={'404'} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
