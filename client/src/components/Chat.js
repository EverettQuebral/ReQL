import React, { Component, Fragment } from 'react'
import ChatMessages from './ChatMessages'
import ChatSender from './ChatSender'
import { withRouter } from 'react-router-dom'
import Header from './Header'

class Chat extends Component {
  render(){
    return (
      <div>
        <Header />
        <ChatMessages />
        <ChatSender />
      </div>
    )
  }
}

export default withRouter(Chat)

