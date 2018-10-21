import CardActionArea from '@material-ui/core/CardActionArea/CardActionArea'
import CardContent from '@material-ui/core/CardContent/CardContent'
import Divider from '@material-ui/core/Divider/Divider'
import createStyles from '@material-ui/core/styles/createStyles'
import withStyles from '@material-ui/core/styles/withStyles'
import Typography from '@material-ui/core/Typography/Typography'
import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { updated } from '../helpers/updated'

const Thread = ({ thread, classes, divider }) => (
  <Fragment>
    <Link to={`/${thread.boardId}/threads/${thread.id}`}>
      <CardActionArea>
        <CardContent>
          <Typography variant={'h6'} gutterBottom>
            {thread.title}
          </Typography>
          <Typography className={classes.date} gutterBottom>
            <span className={classes.count}>
              {thread.responseCount} Responses
            </span>
            <span className={classes.count}>{updated(thread.updatedAt)}</span>
          </Typography>
        </CardContent>
      </CardActionArea>
    </Link>
    {divider && <Divider />}
  </Fragment>
)

const styles = createStyles({
  date: { opacity: 0.6 },
  count: { marginRight: 8 }
})

export default withStyles(styles)(Thread)
