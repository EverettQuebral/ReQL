import React, { Component } from 'react'
import './Header.css'

class Header extends Component {
  render(){
    return (
      <header className="header">
        {this.props.title}
      </header>
    )
  }
}

export default Header