import React, { Component, Fragment } from 'react'
import {
  NavLink,
  Link,
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom'

import AddAddress from './AddAddress'
import Page from './Page'

class Container extends Component {
  constructor(props){
    super(props)
  }

  renderNavigation(){
    return (
      <nav>
        <Link to='/' title='Main'>Main</Link>
        <Link to='/address' title='Add Address'>Add Address</Link>
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
          </Switch>
        </Fragment>
      </Router>
    )
  }
}

export default Container