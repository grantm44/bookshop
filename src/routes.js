"use strict"

import React from 'react'
import ReactDOM from 'react-dom'
import {Router, Route, IndexRoute, browserHistory, hashHistory} from 'react-router'

import Main from './main'
import BooksList from './components/booksList'
import Cart from './components/cart'
import BooksForm from './components/booksForm'


const routes = (
	<Router history={browserHistory}>
		<Route path="/" component={Main}>	
			<IndexRoute component={BooksList}/>
			<Route path="/admin" component={BooksForm}/>
			<Route path="/cart" component={Cart}/>
		</Route>
	</Router>
);

export default routes;