import React, { Component, Fragment } from 'react'
import { gql } from 'apollo-boost'
import { graphql, Subscription } from 'react-apollo'
import Message from './Message'

class ChatMessages extends Component {
  state = {
    children : [],
    components: [],
    channel: 'UIControl'
  }

  render(){
    
    const child = this.state.children
    const currentComponents = this.state.components

    return (
      <div className='chat-messages'>
        <div id='messages'>
          {this.state.components}
        </div>
          <Subscription   
              subscription={MESSAGE_SUSBSCRIPTION}
              variables={{ channel: 'Testing' }}>
            {({data, loading, error}) => {
              if (error) return <div>Error: {error}</div>
              if (loading) return <div>Loading: </div>
              if (data) {
                <div>List of Messages
                  
                  { console.log( 'data received', data ) }


                </div>
              }
              return <div>Chat Messages</div>
            }}
          </Subscription>
      </div>
    )
  }
}

const SubscribeToMessageUpdate = ({ channel }) => (
  <Subscription   
        subscription={MESSAGE_SUSBSCRIPTION}
        variables={{ channel: `${channel}` }}>
      {(messageAdded, {data, loading, error}) => (
        messageAdded('testing')
      )}
  </Subscription>
)

const MESSAGE_SUSBSCRIPTION = gql `
 subscription MessageAdded($channel: String){
   messageAdded(channel: $channel) {
     id
     author
     message
   }
 }
`

const ChatMessageWithSubscription = graphql(MESSAGE_SUSBSCRIPTION, {
  name: 'messageAdded',
  options: {
    errorPolicy: 'ignore'
  }
  , props:  ({ownProps, mutate}) => ({ })
})(ChatMessages)

export default ChatMessageWithSubscription