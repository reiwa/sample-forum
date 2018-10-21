import Card from '@material-ui/core/Card/Card'
import Grid from '@material-ui/core/Grid/Grid'
import { firestore } from 'firebase/app'
import React, { Component } from 'react'
import { APPS, NAMESPACE, RESPONSES, THREADS } from '../constants/collection'
import { ASC } from '../constants/order'
import BoardInfo from '../containers/BoardInfo'
import FormCreateResponse from '../containers/FormCreateResponse'
import Responses from '../containers/Responses'
import ThreadInfo from '../containers/ThreadInfo'

class ThreadPage extends Component {
  render() {
    const { match } = this.props

    return (
      <Grid container spacing={16}>
        <Grid item xs={12} md={4}>
          <Grid container spacing={16}>
            <Grid item xs={12}>
              <Card>
                <BoardInfo boardId={match.params.boardId} />
              </Card>
            </Grid>
            <Grid item xs={12}>
              <Card>
                <ThreadInfo
                  boardId={match.params.boardId}
                  threadId={match.params.threadId}
                />
              </Card>
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
