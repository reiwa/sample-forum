import React, { Component } from 'react'

class Threads extends Component {
  render() {
    const { match } = this.props

    return <div>{match.path}</div>
  }
}

export default Threads
