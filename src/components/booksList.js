'use strict'

import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {getBooks} from '../actions/booksActions'
import {Grid, Col, Row, Button, Carousel} from 'react-bootstrap'
import BookItem from './bookItem'
import BooksForm from './booksForm'
import Cart from './cart'

class BooksList extends Component{
	componentDidMount(){
		//Dispatch an action
		this.props.getBooks()
	}
	render(){
		const booksList = this.props.books.map(book=>{
			return(
				<Col xs={12} sm={5} key={book._id} className='bookitem'>
					<BookItem
						_id={book._id}
						title={book.title}
						description={book.description}
						price={book.price}
						images={book.images} />
				</Col>
			)
		})
		return(
			<Grid>
				<Row>
				  	<Carousel>
				    	<Carousel.Item>
					      	<img width={900} height={300} alt="900x200" src="/images/home1.jpg"/>
					      	<Carousel.Caption>
					        	<h3>First slide label</h3>
					        	<p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
					      	</Carousel.Caption>
				    	</Carousel.Item>
				    	<Carousel.Item>
					      	<img width={900} height={300} alt="900x200" src="/images/home2.jpg"/>
					      	<Carousel.Caption>
					        	<h3>Second slide label</h3>
					        	<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
					      	</Carousel.Caption>
				    	</Carousel.Item>
				  	</Carousel>
				</Row>
				<Row><Cart/></Row>
				<Row style={{marginTop:'15px'}}>
					{booksList}
				</Row>
			</Grid>
		)
	}
}
function mapStateToProps(state){
	return{
		books: state.books.books
	}
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({
		getBooks:getBooks
	}, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(BooksList);