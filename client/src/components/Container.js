import React, { Component, Fragment } from 'react'
import {
  NavLink,
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

class Container extends Component {
  constructor(props){
    super(props)
  }

  renderNavigation(){
    return (
      <nav>
        <Link to='/' title='Main'>Main</Link>
        <Link to='/address' title='Add Address'>Add Address</Link>
        <Link to='/user' title='Add User'>Add User</Link>
        <Link to='/stocks' title='Stocks'>Stocks</Link>
      </nav>
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
          </Switch>
        </Fragment>
      </Router>
    )
  }
}

export default Container