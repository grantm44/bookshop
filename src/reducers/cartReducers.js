'use strict'

//CART REDUCERS

export function cartReducers(state={cart:[]}, action){
	switch(action.type){
		case "GET_CART":
			return {
				...state,
				cart: action.payload,
				totalAmount: totals(action.payload).amount
			}
		case "UPDATE_CART":
			return {...state, cart: action.payload, totalAmount: totals(action.payload).amount}
		case "ADD_TO_CART":
			return {
				...state,
				cart: action.payload,
				totalAmount: totals(action.payload).amount
			}
		case "DELETE_CART_ITEM":
			return{...state, cart: [...action.payload], totalAmount: totals(action.payload).amount}
	}
	return state
}

export function totals(payloadArr){
	const totalAmount = payloadArr.map(item => {
		return item.price * item.quantity
	}).reduce((prev, curr) => prev + curr, 0)
	return {amount: totalAmount.toFixed(2)}
}