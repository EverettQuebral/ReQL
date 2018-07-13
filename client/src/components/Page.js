import React, { Component, Fragment } from 'react'
import { graphql } from 'react-apollo'
import { gql } from 'apollo-boost'
import { Query } from 'react-apollo'
import Header from './Header'
import AddAddress from './AddAddress'
import { Jumbotron, Button, Container } from 'reactstrap'

class Page extends Component {
  render(){
    return (
      <div>
        <Jumbotron fluid>
          <Container fluid>
            <h1 className='display-3'>Welcome to the Prototype Page</h1>
            <p className='lead'>This is the page to test the prototype for the new GraphQL powered React Application</p>
            <hr className='my-2' />
            <p>Below is an example query using GraphQL  to get the name of the user</p>
          </Container>
        </Jumbotron>

        <Query query={FIND_USER}>
          {({loading, error, data})=>{
            if (error) return <div> Error: </div>
            if (loading) return <div> Loading: </div>

            return (
              <div>
                { console.log(data) }
                <div> Name { data.findUser.first_name }</div>
              </div>
            )
          }}
        </Query>
      </div>
    )
  }
}

//export default Page

const FIND_USER = gql `
  query {
    findUser(id:"xxxx"){
      first_name
    }
  }
`

export default graphql(FIND_USER, {
  name: 'findUser',
  options: {
    errorPolicy: 'ignore'
  }
})(Page)



