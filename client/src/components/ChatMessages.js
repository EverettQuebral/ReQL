import React, { Component, Fragment } from 'react'
import { gql } from 'apollo-boost'
import { graphql, Subscription } from 'react-apollo'

class ChatMessages extends Component {
  state = {
    children : [],
    components: [],
    data: []
  }
  
  render(){
    const child = this.state.children
    const components = this.state.components
    const i = 0;
    // const listItems = this.state.children.map((author, message)=><li>{author}: {message}</li>)
    let tempData = [];
    let tempMessage = {};

    return (
      <div className='chat-messages'>
        <Subscription subscription={MESSAGE_SUSBSCRIPTION}>
        {({data, loading, error}) => {
          if (error) return <div>Error: {error}</div>
          if (loading) return <div>Loading: </div>
          return (
            <div>List of Messages
              { tempData = this.state.data }
              { console.log('tempdata ', tempData) }
              { tempMessage = {author: data.messageAdded.author, message: data.messageAdded.message} }
              { tempData.push(...this.props)} // this is causing the error
              {/* { this.state = { data: tempData} } */}
              { console.log('test', this.state)}
              {/* <ul>{listItems}</ul> */}
            </div>
          )
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