import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import '../styles/App.css';
import ArticlesList from './ArticlesList';
import Article from './Article';
import Home from './Home';
import Login from './Login';
// import SignUp from './SignUp';
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
              <Route exact path="/" component={Home} />
              <Route exact path="/login" component={Login} />
              {/* <Route exact path="/signup" component={SignUp} /> */}
              <Route exact path="/articles/:articleId" component={Article}/>
              <Route exact path="/topics/:id/articles" component={ArticlesList} />
              <Route component={Error} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
