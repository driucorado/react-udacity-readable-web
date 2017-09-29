import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {createStore, applyMiddleware, compose } from 'redux'
import { createLogger } from 'redux-logger'
import reducers  from './reducers'
import { Provider } from 'react-redux';
import { ConnectedRouter, routerMiddleware } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'
import thunk from 'redux-thunk';

// Create a history of your choosing (we're using a browser history in this case)
const history = createHistory()

// Build the middleware for intercepting and dispatching navigation actions
const middleware = routerMiddleware(history)

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const loggerMiddleware = createLogger()

const store = createStore(reducers,
	composeEnhancers(applyMiddleware(thunk, loggerMiddleware, middleware))
)

// TODO apply redux
ReactDOM.render(
	<Provider store={store}>
	 	{ /* ConnectedRouter will use the store from Provider automatically */ }
	 	<ConnectedRouter history={history}>
		<App />
		</ConnectedRouter>
	</Provider>
	, document.getElementById('root'));