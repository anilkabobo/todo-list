import RX = require('reactxp');
import App = require('./App');
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { default as reducers } from './common/reducers';
import thunk from 'redux-thunk'

const { Provider }  = require('react-redux');
const store = createStore(reducers, applyMiddleware(thunk));

RX.App.initialize(true, true);
RX.UserInterface.setMainView(<App store={ store } />);
