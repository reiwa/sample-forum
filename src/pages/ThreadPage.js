import Card from '@material-ui/core/Card/Card'
import Grid from '@material-ui/core/Grid/Grid'
import { firestore } from 'firebase/app'
import React, { Component } from 'react'
import { APPS, NAMESPACE, RESPONSES, THREADS } from '../constants/collection'
import { ASC } from '../constants/order'
import BoardInfoCard from '../containers/BoardInfoCard'
import FormCreateResponse from '../containers/FormCreateResponse'
import Responses from '../containers/Responses'
import ThreadInfoCard from '../containers/ThreadInfoCard'

class ThreadPage extends Component {
  render() {
    const { match } = this.props

    return (
      <Grid container spacing={16}>
        <Grid item xs={12} md={4}>
          <Grid container spacing={16}>
            <Grid item xs={12}>
              <BoardInfoCard boardId={match.params.boardId} />
            </Grid>
            <Grid item xs={12}>
              <ThreadInfoCard
                boardId={match.params.boardId}
                threadId={match.params.threadId}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={8}>
          <Card>
            <Responses query={this.query} />
            <FormCreateResponse match={match} />
          </Card>
        </Grid>
      </Grid>
    )
  }

  get query() {
    const { match } = this.props

    return firestore()
      .collection(APPS)
      .doc(NAMESPACE)
      .collection(THREADS)
      .doc(match.params.threadId)
      .collection(RESPONSES)
      .orderBy('updatedAt', ASC)
  }
}

export default ThreadPage
