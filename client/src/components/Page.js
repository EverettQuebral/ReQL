import React, { Component, Fragment } from 'react'
import { graphql } from 'react-apollo'
import { gql } from 'apollo-boost'
import { Query } from 'react-apollo'
import Header from './Header'
import AddAddress from './AddAddress'

class Page extends Component {
  render(){
    return (
      <Fragment>
        <Header title="Welcome and Enjoy"/>
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
      </Fragment>
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



