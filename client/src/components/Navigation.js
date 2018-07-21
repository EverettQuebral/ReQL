import React, { Component, Fragment } from 'react'
import {
  Link,
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom'

import { 
  Nav,
  Navbar,
  NavItem,
  NavLink,
  NavbarBrand,
  Container as Cont,
  Row,
  Col
} from 'reactstrap'

class Navigation extends Component {
  render (){
    return (
      <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">reactstrap</NavbarBrand>

          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink href="/address">Address</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/user">User</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/stocks">Stocks</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/chat">Chat</NavLink>
            </NavItem>
          </Nav>

      </Navbar>
    </div>
    )
  }
}

export default Navigation