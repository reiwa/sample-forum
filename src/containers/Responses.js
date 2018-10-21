import React, { Component } from 'react'
import { collectionData } from 'rxfire/firestore'
import ProgressCardContent from '../components/ProgressCardContent'
import Response from '../components/Response'

class Responses extends Component {
  isUnmounted = false
  subscription = null

  state = { isLoading: true, responses: [] }

  render() {
    const { isLoading, responses } = this.state

    if (isLoading) return <ProgressCardContent />

    return responses.map((response, i) => (
      <Response
        key={response.id}
        response={response}
        divider={Boolean(response.length - i - 1)}
      />
    ))
  }

  componentDidMount() {
    const { query } = this.props

    this.subscription = collectionData(query, 'id').subscribe(responses => {
      if (this.isUnmounted) return
      this.setState({ isLoading: false, responses })
    })
  }

  componentWillUnmount() {
    this.isUnmounted = true
    if (this.subscription) {
      this.subscription.unsubscribe()
    }
  }
}

export default Responses
