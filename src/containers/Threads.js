import React, { Component } from 'react'
import { collectionData } from 'rxfire/firestore'
import NotFoundCard from '../components/NotFoundCard'
import ProgressCardContent from '../components/ProgressCardContent'
import Thread from '../components/Thread'

class Boards extends Component {
  isUnmounted = false
  subscription = null

  state = { isLoading: true, threads: [] }

  render() {
    const { isLoading, threads } = this.state

    if (isLoading) return <ProgressCardContent />

    if (!isLoading && !threads.length) return <NotFoundCard />

    return threads.map((thread, i) => (
      <Thread
        key={thread.id}
        thread={thread}
        divider={Boolean(threads.length - i - 1)}
      />
    ))
  }

  componentDidMount() {
    const { query } = this.props

    this.subscription = collectionData(query, 'id').subscribe(threads => {
      if (this.isUnmounted) return
      this.setState({ isLoading: false, threads })
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
