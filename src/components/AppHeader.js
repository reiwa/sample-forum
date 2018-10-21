import AppBar from '@material-ui/core/AppBar/AppBar'
import createStyles from '@material-ui/core/styles/createStyles'
import withStyles from '@material-ui/core/styles/withStyles'
import Toolbar from '@material-ui/core/Toolbar/Toolbar'
import Typography from '@material-ui/core/Typography/Typography'
import React from 'react'
import { Link } from 'react-router-dom'

const AppHeader = ({ classes }) => (
  <AppBar position={'sticky'}>
    <Toolbar className={classes.toolbar}>
      <Typography variant={'h5'} component={Link} color={'inherit'} to={'/'}>
        Forum
      </Typography>
    </Toolbar>
  </AppBar>
)

const styles = createStyles({
  toolbar: { display: 'flex' },
  link: { marginLeft: 32 }
})

export default withStyles(styles)(AppHeader)
