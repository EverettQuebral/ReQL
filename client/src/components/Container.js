import React, { Component, Fragment } from 'react'
import {
  Link,
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom'

import './Container.css'

import AddAddress from './AddAddress'
import Page from './Page'
import AddUser from './AddUser'
import Stocks from './Stocks'
import Chat from './Chat'

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



class Container extends Component {
  constructor(props){
    super(props)
  }

  renderNavigation(){
    return (
      <Navbar color='light'>
        <Cont>
          <Row>
            <Col xs='auto'>
              <NavbarBrand href='/'>React - GraphQL Proptotype</NavbarBrand>
            </Col>
          </Row>
          <Row>
            <Col xs='3'>
            </Col>
            <Col xs='auto'>
              <Nav className='ml-auto' horizontal>
                <NavItem>
                  <NavLink href='/address'>Address</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href='/user'>User</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href='/stocks'>Stocks</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href='/chat'>Chat</NavLink>
                </NavItem>
              </Nav>
            </Col>
          </Row>
        </Cont>
      </Navbar>
    )
  }
  render() {
    return (
      <Router>
        <Fragment>
          {this.renderNavigation()}
          <Switch>
            <Route exact path='/' component={Page} />
            <Route exact path='/address' component={AddAddress} />
            <Route exact path='/user' component={AddUser} />
            <Route exact path='/stocks' component={Stocks} />
            <Route exact path='/chat' component={Chat} />
          </Switch>
        </Fragment>
      </Router>
    )
  }
}

export default Container