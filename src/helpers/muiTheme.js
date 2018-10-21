import blue from '@material-ui/core/colors/blue'
import { createMuiTheme } from '@material-ui/core/styles'

export const muiTheme = createMuiTheme({
  typography: { useNextVariants: true },
  palette: {
    primary: blue
  }
})
