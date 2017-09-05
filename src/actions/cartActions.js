'use strict'
import axios from 'axios';

//GET CART
export function getCart(){
	return function(dispatch){
		axios.get('/api/cart')
		.then(function(response){
			dispatch({type: 'GET_CART', payload: response.data})
		})
		.catch(function(err){
			dispatch({type: 'GET_CART_ERROR', msg: err})
		})
	}
}
//ADD TO CART
export function addToCart(book){
	return function(dispatch){
		axios.post('/api/cart', book)
		.then(function(response){
			dispatch({type:"ADD_TO_CART", payload: response.data })
		})
		.catch(function(err){
			dispatch({type: 'ADD_TO_CART_REJECTED', msg: err})
		})
	}
}

export function updateCart(_id, unit, cart){
	const index = cart.findIndex(item => item._id === _id)
	cart[index].quantity += unit
	return function(dispatch){
		axios.post('/api/cart', cart)
		.then(function(response){
			dispatch({type:"UPDATE_CART", payload: response.data })
		})
		.catch(function(err){
			dispatch({type: 'UPDATE_CART_REJECTED', msg: err})
		})
	}
}
//DELETE FROM CART
export function deleteCartItem(cart){
	return function(dispatch){
		axios.post('/api/cart', cart)
		.then(function(response){
			dispatch({type:"DELETE_CART_ITEM", payload: response.data })
		})
		.catch(function(err){
			dispatch({type: 'DELETE_CART_ITEM_REJECTED', msg: err})
		})
	}
}