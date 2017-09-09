import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import {createStore, applyMiddleware, compose } from 'redux'
import { createLogger } from 'redux-logger'
import reducer  from './reducers'
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import './style/css/index.css';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const loggerMiddleware = createLogger()

const store = createStore(reducer,
	composeEnhancers(applyMiddleware(thunk, loggerMiddleware))
)

// TODO apply redux
ReactDOM.render(
	<Provider store={store}>
	<BrowserRouter>
	<App />
	</BrowserRouter>
	</Provider>
	, document.getElementById('root'));