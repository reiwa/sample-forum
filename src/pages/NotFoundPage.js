import React, { Component } from 'react'

class NotFoundPage extends Component {
  render() {
    const { match } = this.props

    return <div>{match.path}</div>
  }
}

export default NotFoundPage
