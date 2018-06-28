import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { graphql } from 'react-apollo'
import { gql } from 'apollo-boost'
import { Mutation } from 'react-apollo'

class AddAddress extends Component {
  state = {
    address1: '',
    address2: '',
    city: '',
    state: '',
    zip: '',
    country: ''
  }

  handlePost = async (e) => {
    console.log('handling Post')
    e.preventDefault()
    const { address1, address2, city, state, zip, country } = this.state
    console.log('handling Post ', this.state)
    await this.props.addAddressMutation({
      variables: { address1, address2, city, state, zip, country }
    })
    this.props.history.replace('/')
  }

  render(){
    return (
      <div>
        <form name="add-address" onSubmit={this.handlePost}>
          <input type='string' name='address1' placeholder='Address 1'
            onChange={e => this.setState({address1: e.target.value})}/>
          <input type='string' name='address2' placeholder='Address 2'
            onChange={e => this.setState({address2: e.target.value})}/>
          <input type='string' name='city' placeholder='City'
            onChange={e => this.setState({city: e.target.value})}/>
          <input type='string' name='state' placeholder='State'
            onChange={e => this.setState({state: e.target.value})}/>
          <input type='string' name='zip' placeholder='Zip'
            onChange={e => this.setState({zip: e.target.value})}/>
          <input type='string' name='country' placeholder='Country'
            onChange={e => this.setState({country: e.target.value})}/>
          <input type='submit' name='Add Address'/>
        </form>
      </div>
    )
  }
}


const ADD_ADDRESS = gql `
  mutation AddAddress($address1: String!, $address2: String!, $city: String!, $state: String!, $zip: String!, $country: String!){
    addAddress(
      address1: $address1
      address2: $address2
      city: $city
      state: $state
      zip: $zip
      country: $country
    ){
      message
    }
  }
`

const AddAddressWithMutation = graphql(ADD_ADDRESS, {
  name: 'addAddressMutation',
  options: {
    errorPolicy: 'ignore'
  }
})(AddAddress)

export default withRouter(AddAddressWithMutation)