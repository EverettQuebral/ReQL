import React, { Component, Fragment } from 'react'
import { graphql } from 'react-apollo'
import { gql } from 'apollo-boost'
import { Query } from 'react-apollo'
import Header from './Header'
import AddAddress from './AddAddress'
import { Jumbotron, Button, Container } from 'reactstrap'
import Navigation from './Navigation'

class Page extends Component {
  render(){
    return (
      <div>
        <Header />
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


