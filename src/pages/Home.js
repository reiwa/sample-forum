import React, { Component } from 'react'

class Home extends Component {
  render() {
    const { match } = this.props

    return <div>{match.path}</div>
  }
}

export default Home
