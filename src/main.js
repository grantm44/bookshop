'use strict'

import React from 'react'

import Menu from './components/menu'
import Footer from './components/footer'
import {connect} from 'react-redux'
import {getCart} from './actions/cartActions'
import {bindActionCreators} from 'redux'

class Main extends React.Component{

	componentDidMount(){
		this.props.getCart()
	}
	render(){
		return(
			<div>
				<Menu cartItemsNumber={this.props.totalAmount}/>
					{this.props.children}
				<Footer/>
			</div>
		)
	}
}

function mapStateToProps(state){
	return{
		totalAmount: state.cart.totalAmount
	}
}

function mapDispatchFromProps(dispatch){
	return bindActionCreators({
		getCart: getCart
	}, dispatch)
}

export default connect(mapStateToProps, mapDispatchFromProps)(Main)