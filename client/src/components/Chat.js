import React, { Component, Fragment } from 'react'
import ChatMessages from './ChatMessages'
import ChatSender from './ChatSender'
import { withRouter } from 'react-router-dom'

class Chat extends Component {
  render(){
    return (
      <div>
        <ChatMessages />
        <ChatSender />
      </div>
    )
  }
}

export default withRouter(Chat)

