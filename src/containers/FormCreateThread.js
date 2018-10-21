import Button from '@material-ui/core/Button/Button'
import CardContent from '@material-ui/core/CardContent/CardContent'
import createStyles from '@material-ui/core/styles/createStyles'
import withStyles from '@material-ui/core/styles/withStyles'
import TextField from '@material-ui/core/TextField/TextField'
import Typography from '@material-ui/core/Typography/Typography'
import React, { Component } from 'react'
import { createThread } from '../functions/createThread'

class FormCreateThread extends Component {
  isUnmounted = false

  state = {
    threadTitle: '',
    threadDescription: '',
    threadDisplayName: '',
    inProgress: false
  }

  render() {
    const { classes } = this.props
    const {
      threadDisplayName,
      threadDescription,
      threadTitle,
      inProgress
    } = this.state

    return (
      <CardContent>
        <Typography variant={'h5'}>New Thread</Typography>
        <form onSubmit={this.onSubmit}>
          <div className={classes.formItem}>
            <TextField
              onChange={this.onChangeThreadTitle}
              value={threadTitle}
              fullWidth
              variant={'outlined'}
              placeholder={'Title'}
              disabled={inProgress}
            />
          </div>
          {threadTitle && (
            <div className={classes.formItem}>
              <TextField
                onChange={this.onChangeThreadDescription}
                value={threadDescription}
                fullWidth
                variant={'outlined'}
                placeholder={'Description'}
                disabled={inProgress}
              />
            </div>
          )}
          {threadTitle && (
            <div className={classes.formItem}>
              <TextField
                onChange={this.onChangeThreadDisplayName}
                value={threadDisplayName}
                fullWidth
                variant={'outlined'}
                placeholder={'Display Name (Optional)'}
                disabled={inProgress}
              />
            </div>
          )}
          <div className={classes.formItem}>
            <Button
              onClick={this.onSubmit}
              variant={'contained'}
              color={'primary'}
              disabled={inProgress || !threadTitle || !threadDescription}
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

  onChangeThreadDescription = event => {
    this.setState({ threadDescription: event.target.value })
  }

  onChangeThreadDisplayName = event => {
    this.setState({ threadDisplayName: event.target.value })
  }

  onChangeThreadTitle = event => {
    this.setState({ threadTitle: event.target.value })
  }

  onSubmit = event => {
    const {
      threadDescription,
      threadDisplayName,
      threadTitle,
      inProgress
    } = this.state
    const { match } = this.props

    event.preventDefault()

    if (inProgress) return

    if (!threadDescription || !threadTitle) return

    this.setState({ inProgress: true })

    const input = {
      displayName: threadDisplayName,
      description: threadDescription,
      title: threadTitle,
      boardId: match.params.boardId
    }

    createThread(input)
      .then(() => {
        if (this.isUnmounted) return
        this.setState({
          inProgress: false,
          threadTitle: '',
          threadDescription: '',
          threadDisplayName: ''
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

export default withStyles(styles)(FormCreateThread)
