import CardContent from '@material-ui/core/CardContent/CardContent'
import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress'
import createStyles from '@material-ui/core/styles/createStyles'
import withStyles from '@material-ui/core/styles/withStyles'
import React from 'react'

const ProgressCardContent = ({ classes }) => (
  <CardContent className={classes.root}>
    <CircularProgress />
  </CardContent>
)

const styles = createStyles({
  root: { paddingTop: 40, textAlign: 'center' }
})

export default withStyles(styles)(ProgressCardContent)
