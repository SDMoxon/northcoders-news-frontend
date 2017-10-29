import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import reducer from './reducers';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.css';
import './styles/index.css';
import './styles/Header.css';
import './styles/App.css';

const store = createStore(reducer, applyMiddleware(thunk, logger));

ReactDOM.render(
<Provider store={store}>
<App /> 
</Provider> , document.getElementById('root'));
registerServiceWorker();
