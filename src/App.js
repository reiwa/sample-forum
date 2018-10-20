import CssBaseline from '@material-ui/core/CssBaseline/CssBaseline'
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import React, { Component } from 'react'
import JssProvider from 'react-jss/lib/JssProvider'
import AppRouter from './AppRouter'
import { generateClassName } from './helpers/generateClassName'
import { muiTheme } from './helpers/muiTheme'

class App extends Component {
  render() {
    return (
      <JssProvider generateClassName={generateClassName}>
        <MuiThemeProvider theme={muiTheme}>
          <CssBaseline />
          <AppRouter />
        </MuiThemeProvider>
      </JssProvider>
    )
  }
}

export default App
