import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { graphql } from 'react-apollo'
import { gql } from 'apollo-boost'

import { User, UserInput, StatusMessage, UserInputMessage, Address, AddressInput } from '../common'
import { 
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input
} from 'reactstrap'
import Header from './Header';

class AddUser extends Component {
  state = {
    user : {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      address: {
        address1: '',
        address2: '',
        city: '',
        state: '',
        zip: '',
        country: ''
      }
    }
  }

  handlePost = async (e) => {
    console.log('handling post')
    e.preventDefault()
    const {
      user :{
        first_name,
        last_name,
        email,
        password,
        address: {
          address1,
          address2,
          city,
          state,
          zip,
          country
        }
      },
    } = this.state
    console.log('handling post ', this.state)
    await this.props.addUserMutation({
      variables: { user: UserInput }
    })
  }

  render() {
    return (
      <div>
        <Header />
        <form name='add-user' onSubmit={this.handlePost}>
          <input type='string' name='first_name' placeholder='First Name'
            onChange={e => this.setState({user:{first_name: e.target.value}})} />
          <input type='string' name='last_name' placeholder='Last Name'
            onChange={e => this.setState({user:{last_name: e.target.value}})} />
          <input type='string' name='email' placeholder='Email'
            onChange={e => this.setState({user:{email: e.target.value}})} /> 
          <input type='password' name='password' placeholder='Password'
            onChange={e => this.setState({user:{password: e.target.value}})} />
          <input type='address1' name='address1' placeholder='Address Line 1'
            onChange={e => this.setState({user:{address:{address1: e.target.value}}})} />
          <input type='address2' name='address2' placeholder='Address Line 2'
            onChange={e => this.setState({user:{address:{address2: e.target.value}}})} />
          <input type='city' name='city' placeholder='City'
            onChange={e => this.setState({user:{address:{city: e.target.value}}})} />
          <input type='state' name='state' placeholder='State' 
            onChange={e => this.setState({user:{address:{state: e.target.value}}})} />
          <input type='zip' name='zip' placeholder='Zip'
            onChange={e => this.setState({user:{address:{zip: e.target.value}}})} />
          <input type='country' name='country' placeholder='Country'
            onChange={e => this.setState({user:{address:{country: e.target.value}}})} />
          <input type='submit' name='Submit' />
        </form>
      </div>
    )
  }
}

const ADD_USER = gql `
  mutation AddUser($user: UserInput!){
    addUser(
      first_name: $first_name
    ){
      message
    }
  }
` 

const AddUserWithMutation = graphql(ADD_USER, {
  name: 'addUserMutation',
  options: {
    errorPolicy: 'ignore'
  }
})(AddUser)

export default withRouter(AddUserWithMutation)


// addUser(input: 
//   {
//     first_name: $user.first_name
//     last_name: $user.last_name
//     email: $user.email
//     password: $user.password
//     address : {
//       address1: $user.address.address1
//       address2: $user.address.address2
//       city: $user.address.city
//       state: $user.address.state
//       zip: $user.address.zip
//       country: $user.address.country
//     }
//   }
// )
// {
//   message
// }