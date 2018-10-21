import Button from '@material-ui/core/Button/Button'
import CardContent from '@material-ui/core/CardContent/CardContent'
import createStyles from '@material-ui/core/styles/createStyles'
import withStyles from '@material-ui/core/styles/withStyles'
import TextField from '@material-ui/core/TextField/TextField'
import Typography from '@material-ui/core/Typography/Typography'
import React, { Component } from 'react'
import { createResponse } from '../functions/createResponse'

class FormCreateResponse extends Component {
  isUnmounted = false

  state = {
    responseDisplayName: '',
    responseText: '',
    inProgress: false
  }

  render() {
    const { classes } = this.props
    const { responseDisplayName, responseText, inProgress } = this.state

    return (
      <CardContent>
        <Typography variant={'h5'}>New Response</Typography>
        <form onSubmit={this.onSubmit}>
          <div className={classes.formItem}>
            <TextField
              onChange={this.onChangeResponseDisplayName}
              value={responseDisplayName}
              fullWidth
              variant={'outlined'}
              placeholder={'Display Name (Optional)'}
              disabled={inProgress}
            />
          </div>
          <div className={classes.formItem}>
            <TextField
              onChange={this.onChangeResponseText}
              value={responseText}
              fullWidth
              variant={'outlined'}
              placeholder={'Text'}
              disabled={inProgress}
            />
          </div>
          <div className={classes.formItem}>
            <Button
              onClick={this.onSubmit}
              variant={'contained'}
              color={'primary'}
              disabled={inProgress}
            >
              create
            </Button>
          </div>
        </form>
      </CardContent>
    )
  }

  componentWillUnmount() {
    this.isUnmounted = true
  }

  onChangeResponseDisplayName = event => {
    this.setState({ responseDisplayName: event.target.value })
  }

  onChangeResponseText = event => {
    this.setState({ responseText: event.target.value })
  }

  onSubmit = event => {
    const { responseDisplayName, responseText, inProgress } = this.state
    const { match } = this.props

    event.preventDefault()

    if (inProgress) return

    if (!responseText) return

    this.setState({ inProgress: true })

    const input = {
      displayName: responseDisplayName,
      text: responseText,
      boardId: match.params.boardId,
      threadId: match.params.threadId
    }

    createResponse(input)
      .then(() => {
        if (this.isUnmounted) return
        this.setState({
          inProgress: false,
          responseDisplayName: '',
          responseText: ''
        })
      })
      .catch(err => {
        console.error(err)
        if (this.isUnmounted) return
        this.setState({ inProgress: false })
      })
  }
}

const styles = createStyles({
  formItem: { paddingTop: 16, textAlign: 'right' }
})

export default withStyles(styles)(FormCreateResponse)
