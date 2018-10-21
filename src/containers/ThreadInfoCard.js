import Card from '@material-ui/core/Card/Card'
import CardContent from '@material-ui/core/CardContent/CardContent'
import createStyles from '@material-ui/core/styles/createStyles'
import withStyles from '@material-ui/core/styles/withStyles'
import Typography from '@material-ui/core/Typography/Typography'
import { firestore } from 'firebase/app'
import React, { Component } from 'react'
import { docData } from 'rxfire/firestore'
import { APPS, NAMESPACE, THREADS } from '../constants/collection'
import { updated } from '../helpers/updated'

class ThreadInfoCard extends Component {
  isUnmounted = false
  subscription = null

  state = { thread: null }

  render() {
    const { classes } = this.props
    const { thread } = this.state

    if (!thread) return null

    return (
      <Card>
        <CardContent>
          <Typography variant={'h6'} gutterBottom>
            {thread.title}
          </Typography>
          <Typography variant={'body2'} gutterBottom>
            {thread.description}
          </Typography>
          <Typography className={classes.date} gutterBottom>
            <span className={classes.count}>
              {thread.responseCount} Responses
            </span>
          </Typography>
          <Typography className={classes.date}>
            {updated(thread.updatedAt)}
          </Typography>
        </CardContent>
      </Card>
    )
  }

  componentDidMount() {
    const { threadId } = this.props

    const query = firestore()
      .collection(APPS)
      .doc(NAMESPACE)
      .collection(THREADS)
      .doc(threadId)

    this.subscription = docData(query).subscribe(thread => {
      if (this.isUnmounted) return
      this.setState({ thread })
    })
  }

  componentWillUnmount() {
    this.isUnmounted = true
    if (this.subscription) {
      this.subscription.unsubscribe()
    }
  }
}

const styles = createStyles({
  date: { opacity: 0.6 },
  count: { marginRight: 8 }
})

export default withStyles(styles)(ThreadInfoCard)
