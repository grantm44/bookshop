"use strict"
import {createStore, applyMiddleware} from 'redux';
import logger from 'redux-logger'
import reducers from './reducers/index'
import {addToCart} from './actions/cartActions'
import {postBooks, deleteBooks, updateBook} from './actions/booksActions'
import {Provider} from 'react-redux'
import React from 'react'
import ReactDOM from 'react-dom'

import {Router, Route, IndexRoute, browserHistory, hashHistory} from 'react-router'
import thunk from 'redux-thunk'
import routes from './routes'
// STEP 1 create the store
const middleware = applyMiddleware(thunk, logger)
//PASS INITIAL STATE FROM SERVER STORE
const initialState = window.INITIAL_STATE;
const store = createStore(reducers, initialState, middleware);

ReactDOM.render(
	<Provider store={store}>
		{routes}
	</Provider>, document.getElementById('app')
);

