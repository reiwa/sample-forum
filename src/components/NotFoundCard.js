import Card from '@material-ui/core/Card/Card'
import CardContent from '@material-ui/core/CardContent/CardContent'
import createStyles from '@material-ui/core/styles/createStyles'
import withStyles from '@material-ui/core/styles/withStyles'
import Typography from '@material-ui/core/Typography/Typography'
import React from 'react'

const NotFoundCard = ({ classes }) => (
  <Card>
    <CardContent className={classes.cardContent}>
      <Typography>There are not threads yet</Typography>
    </CardContent>
  </Card>
)

const styles = createStyles({
  cardContent: { paddingTop: 24 }
})

export default withStyles(styles)(NotFoundCard)
