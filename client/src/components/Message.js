import React, { Component, Fragment } from 'react'

class Message extends Component {
    render() {
        return (
            <div>
                <span>Author: {this.props.author}</span>
                <span>Message: {this.props.message}</span>
            </div>
        )
    }
}

export default Message