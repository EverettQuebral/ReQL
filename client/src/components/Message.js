import React, { Component, Fragment } from 'react'

class Message extends Component {
    render() {
        return (
            <div message_id={this.props.id}>
                <span>Author: {this.props.author}</span>
                <span>Message: {this.props.message}</span>
            </div>
        )
    }
}

export default Message