import Card from '@material-ui/core/Card/Card'
import CardContent from '@material-ui/core/CardContent/CardContent'
import Grid from '@material-ui/core/Grid/Grid'
import { firestore } from 'firebase/app'
import React, { Component } from 'react'
import { APPS, BOARDS, NAMESPACE } from '../constants/collection'
import Boards from '../containers/Boards'
import FormCreateBoard from '../containers/FormCreateBoard'

class HomePage extends Component {
  render() {
    return (
      <Grid container spacing={16}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <FormCreateBoard />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={8}>
          <Card>
            <Boards query={this.query} />
          </Card>
        </Grid>
      </Grid>
    )
  }

  get query() {
    return firestore()
      .collection(APPS)
      .doc(NAMESPACE)
      .collection(BOARDS)
      .orderBy('updatedAt', 'desc')
  }
}

export default HomePage
