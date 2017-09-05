import React from 'react'
import {Row, Col, Well, Button, Image} from 'react-bootstrap'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {addToCart, updateCart} from '../actions/cartActions'

class BookItem extends React.Component{
	
	handleCart(){
		console.log(this.props._id)
		const books = [...this.props.cart, {
			_id: this.props._id,
			title:this.props.title,
			description:this.props.description,
			price:this.props.price,
			images: this.props.images,
			quantity: 1
		}]
		//Check if cart is empty
		if(this.props.cart.length > 0){
			//cart is not empty
			let _id = this.props._id
			var cartIndex = this.props.cart.findIndex(item => item._id === _id)
			
			if(cartIndex === -1){
				this.props.addToCart(books)
			}else{
				this.props.updateCart(_id, 1, this.props.cart)
			}
		
		}else{
			//cart is emtpy
			this.props.addToCart(books)
		}
		
	}
	
	render(){
		return(
			<Well>
				<Row>
					<Col xs={12} sm={4}>
						<Image src={this.props.images} responsive />
					</Col>
					<Col xs={12} sm={6}>
						<h6>{this.props.title}</h6>
						<p>{this.props.description}</p>
						<h6>{this.props.price}</h6>
						<Button onClick={this.handleCart.bind(this)} bsStyle='primary'>Buy now</Button>
					</Col>
				</Row>
			</Well>
		)
	}
}

function mapStateToProps(state){
	return{
		cart: state.cart.cart
	}
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({
		addToCart:addToCart,
		updateCart: updateCart
	}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(BookItem)