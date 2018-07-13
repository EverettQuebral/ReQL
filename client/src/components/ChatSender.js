import React, { Component, Fragment } from 'react'
import { gql } from 'apollo-boost'
import { graphql, Mutation } from 'react-apollo'

class ChatSender extends Component {
  state = {
    author: '',
    message: ''
  }

  // handlePost = async (e) => {
  //   console.log('handling sending message')
  //   e.preventDefault()
  //   const { author, message } = this.state
  //   await this.props.sendMessage({
  //     variables: { author, message }
  //   })
  // }

  render(){
    return (
      <Mutation mutation={SEND_MESSAGE} onCompleted={()=>{
        console.log('completed')
        this.state = {
          author: '',
          message: ''
        }
        }}>
        {(sendMessage, {data})=>(
          <form
            onSubmit={e => {
              e.preventDefault()
              sendMessage({ variables: this.state })
            }}          
          >
            <input type='string' name='author'
             onChange={e => this.setState({author: e.target.value})}/>
            <input type='string' name='message' 
             onChange={e => this.setState({message: e.target.value})}/>
            <input type='submit' name='Send'/>
          </form>
        )}
      </Mutation>
      // <div>
      //   <form name='send-message' onSubmit={this.handlePost}>
      //     <input type='string' name='author' placeholder='Author'
      //       onChange={e => this.setState({author: e.target.value})}/>
      //     <input type='string' name='message' placeholder='Message'
      //       onChange={e => this.setState({message: e.target.value})}/>
      //     <input type='submit' name='Send'/>
      //   </form>
      // </div>
    )
  }
}

const SEND_MESSAGE = gql `
  mutation SendMessage($author: String!, $message: String!){
    sendMessage(
      author: $author
      message: $message
    ){
      author
      message
    }
  }
`

const ChatSenderWithMutation = graphql(SEND_MESSAGE, {
  name: 'sendMessage',
  options: {
    errorPolicy: 'ignore'
  }
})(ChatSender)

export default ChatSenderWithMutation