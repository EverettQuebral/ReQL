import React, { Component, Fragment } from 'react'
import { gql } from 'apollo-boost'
import { graphql, Subscription } from 'react-apollo'
import Message from './Message'

class ChatMessages extends Component {
  state = {
    children : [],
    components: [],
    data: []
  }
  
  render(){
    const child = this.state.children
    const currentComponents = this.state.components


    return (
      <div className='chat-messages'>
        <div id='messages'>
          {this.state.components}
        </div>
        <Subscription subscription={MESSAGE_SUSBSCRIPTION}>
        {({data, loading, error}) => {
          if (error) return <div>Error: {error}</div>
          if (loading) return <div>Loading: </div>
          if (data) {
            <div>List of Messages
              { console.log( 'data received', data ) }
              { currentComponents.push(<Message author={data.messageAdded.author} message={data.messageAdded.message}/>) }
              { this.state = { components: currentComponents } }
              {/* { this.state = {components : <Message author={data.messageAdded.author} message={data.messageAdded.message}/>} } */}
              { console.log(this.state) }

            </div>
          }
          return <div>Chat</div>
        }}
        </Subscription>
      </div>
    )
  }
}

const MESSAGE_SUSBSCRIPTION = gql `
 subscription {
   messageAdded {
     author
     message
   }
 }
`

const ChatMessageWithSubscription = graphql(MESSAGE_SUSBSCRIPTION, {
  name: 'messageAdded',
  options: {
    errorPolicy: 'ignore'
  },
  props:  ({ownProps, mutate}) => ({ })
})(ChatMessages)

export default ChatMessageWithSubscription