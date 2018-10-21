import Card from '@material-ui/core/Card/Card'
import CardActionArea from '@material-ui/core/CardActionArea/CardActionArea'
import CardContent from '@material-ui/core/CardContent/CardContent'
import createStyles from '@material-ui/core/styles/createStyles'
import withStyles from '@material-ui/core/styles/withStyles'
import Typography from '@material-ui/core/Typography/Typography'
import { firestore } from 'firebase/app'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { docData } from 'rxfire/firestore'
import { APPS, BOARDS, NAMESPACE } from '../constants/collection'
import { updated } from '../helpers/updated'

class BoardInfoCard extends Component {
  isUnmounted = false
  subscription = null

  state = { board: null }

  render() {
    const { classes, boardId } = this.props
    const { board } = this.state

    if (!board) return null

    return (
      <Link to={`/${boardId}`}>
        <Card>
          <CardActionArea>
            <CardContent>
              <Typography variant={'h6'} gutterBottom>
                {board.title}
              </Typography>
              <Typography variant={'body2'} gutterBottom>
                {board.description}
              </Typography>
              <Typography className={classes.date} gutterBottom>
                <span className={classes.count}>
                  {board.threadCount} Threads
                </span>
                <span className={classes.count}>
                  {board.responseCount} Responses
                </span>
              </Typography>
              <Typography className={classes.date}>
                {updated(board.updatedAt)}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Link>
    )
  }

  componentDidMount() {
    const { boardId } = this.props

    const query = firestore()
      .collection(APPS)
      .doc(NAMESPACE)
      .collection(BOARDS)
      .doc(boardId)

    this.subscription = docData(query).subscribe(board => {
      if (this.isUnmounted) return
      this.setState({ board })
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

export default withStyles(styles)(BoardInfoCard)
