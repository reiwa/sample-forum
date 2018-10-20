import React, { Component } from 'react'

class NotFound extends Component {
  render() {
    const { match } = this.props

    return <div>{match.path}</div>
  }
}

export default NotFound
