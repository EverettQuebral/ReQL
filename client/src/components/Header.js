import React, { Component } from 'react'
import './Header.css'
import { Jumbotron, Button, Container } from 'reactstrap'
import Navigation from './Navigation'

class Header extends Component {
  render(){
    return (
      <header className="header">
        <Jumbotron fluid>
          <Container fluid>
            <h1 className='display-3'>Welcome to the Prototype Page</h1>
            <p className='lead'>This is the page to test the prototype for the new GraphQL powered React Application</p>
            <hr className='my-2' />
            <p>Below is an example query using GraphQL  to get the name of the user</p>
          </Container>
          <Navigation />
        </Jumbotron>
      </header>
    )
  }
}

export default Header