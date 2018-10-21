import Card from '@material-ui/core/Card/Card'
import Grid from '@material-ui/core/Grid/Grid'
import { firestore } from 'firebase/app'
import React, { Component } from 'react'
import { APPS, BOARDS, NAMESPACE, THREADS } from '../constants/collection'
import { DESC } from '../constants/order'
import BoardInfoCard from '../containers/BoardInfoCard'
import FormCreateThreadCard from '../containers/FormCreateThreadCard'
import Threads from '../containers/Threads'

class ThreadsPage extends Component {
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
              <FormCreateThreadCard match={match} />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={8}>
          <Card>
            <Threads query={this.query} />
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
      .collection(BOARDS)
      .doc(match.params.boardId)
      .collection(THREADS)
      .orderBy('updatedAt', DESC)
  }
}

export default ThreadsPage
