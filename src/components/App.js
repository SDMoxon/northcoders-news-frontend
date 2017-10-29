import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import '../styles/App.css';
import Articles from './Articles';
import Header from './Header';
import Error from './404';

class App extends Component {
  render() {
    return (
      <div className='App'>
        <Router>
          <div>
            <Header />
            <Switch>
              <Route exact path="/" component={Articles} />
              <Route exact path="/topics/:id/articles" component={Articles} />
              <Route component={Error} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
