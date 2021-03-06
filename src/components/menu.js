import React from 'react'
import {Nav, NavItem, Navbar, Badge} from 'react-bootstrap'

class Menu extends React.Component{
	render(){
		return(
			<Navbar inverse fixedTop>
				<Navbar.Header>
  					<Navbar.Brand>
    					<a href="/">React-Bootstrap</a>
  					</Navbar.Brand>
  					<Navbar.Toggle />
				</Navbar.Header>
				<Navbar.Collapse>
	  				<Nav>
					    <NavItem eventKey={1} href="/about">about</NavItem>
	    				<NavItem eventKey={2} href="/contact">contact</NavItem>
	  				</Nav>
	  				<Nav pullRight>
	    				<NavItem eventKey={1} href="/admin">admin</NavItem>
	    				<NavItem eventKey={2} href="/cart">your cart
	    			{ (this.props.cartItemsNumber > 0)?(<Badge className="badge">{this.props.cartItemsNumber}</Badge>): ('') } </NavItem>
	  				</Nav>
				</Navbar.Collapse>
			</Navbar>
		)
	}
}

export default Menu