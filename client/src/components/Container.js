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





class Container extends Component {
  constructor(props){
    super(props)
  }

  render() {
    return (
      <Router>
        <Fragment>
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