import React, { Component } from 'react'
import { collectionData } from 'rxfire/firestore'
import Board from '../components/Board'

class Boards extends Component {
  isUnmounted = false
  subscription = null

  state = { boards: [] }

  render() {
    const { boards } = this.state

    return boards.map(board => <Board key={board.id} board={board} />)
  }

  componentDidMount() {
    const { query } = this.props

    this.subscription = collectionData(query, 'id').subscribe(boards => {
      if (this.isUnmounted) return
      this.setState({ boards })
    })
  }

  componentWillUnmount() {
    this.isUnmounted = true
    if (this.subscription) {
      this.subscription.unsubscribe()
    }
  }
}

export default Boards
