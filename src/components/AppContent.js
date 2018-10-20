import createStyles from '@material-ui/core/styles/createStyles'
import withStyles from '@material-ui/core/styles/withStyles'
import React from 'react'

const AppContent = ({ classes, children }) => (
  <div className={classes.root}>{children}</div>
)

const styles = createStyles({
  root: { margin: 'auto', maxWidth: 1280 }
})

export default withStyles(styles)(AppContent)
