import CardContent from '@material-ui/core/CardContent/CardContent'
import Divider from '@material-ui/core/Divider/Divider'
import createStyles from '@material-ui/core/styles/createStyles'
import withStyles from '@material-ui/core/styles/withStyles'
import Typography from '@material-ui/core/Typography/Typography'
import React, { Fragment } from 'react'
import { timeLag } from '../helpers/timeLag'

const Response = ({ response, classes, divider }) => (
  <Fragment>
    <CardContent>
      <div className={classes.info}>
        <Typography className={classes.index} variant={'body2'}>
          <span>{String(response.index)}</span>
        </Typography>
        <Typography className={classes.displayName} variant={'body2'}>
          <span>{response.displayName || 'unknown'}</span>
        </Typography>
        <Typography className={classes.date}>
          {'・'}
          {timeLag(response.updatedAt)}
        </Typography>
      </div>
      <Typography className={classes.text} variant={'body2'}>
        {response.text}
      </Typography>
    </CardContent>
    {divider && <Divider />}
  </Fragment>
)

const styles = createStyles({
  info: { display: 'flex' },
  index: { fontWeight: 'bold' },
  displayName: { marginLeft: 8, fontWeight: 'bold' },
  date: { opacity: 0.6 },
  text: { marginTop: 8 }
})

export default withStyles(styles)(Response)
