import React, { Component } from 'react'

class Thread extends Component {
  render() {
    const { match } = this.props

    return <div>{match.path}</div>
  }
}

export default Thread
