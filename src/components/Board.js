import CardActionArea from '@material-ui/core/CardActionArea/CardActionArea'
import CardContent from '@material-ui/core/CardContent/CardContent'
import Divider from '@material-ui/core/Divider/Divider'
import createStyles from '@material-ui/core/styles/createStyles'
import withStyles from '@material-ui/core/styles/withStyles'
import Typography from '@material-ui/core/Typography/Typography'
import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { updated } from '../helpers/updated'

const Board = ({ board, classes }) => (
  <Fragment>
    <Link to={`/${board.id}`}>
      <CardActionArea>
        <CardContent>
          <Typography variant={'h6'} gutterBottom>
            {board.title}
          </Typography>
          <Typography variant={'body2'} gutterBottom>
            {board.description}
          </Typography>
          <Typography className={classes.date}>
            {updated(board.updatedAt)}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Link>
    <Divider />
  </Fragment>
)

const styles = createStyles({
  date: { opacity: 0.6 }
})

export default withStyles(styles)(Board)
