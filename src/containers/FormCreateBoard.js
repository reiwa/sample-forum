import Button from '@material-ui/core/Button/Button'
import CardContent from '@material-ui/core/CardContent/CardContent'
import createStyles from '@material-ui/core/styles/createStyles'
import withStyles from '@material-ui/core/styles/withStyles'
import TextField from '@material-ui/core/TextField/TextField'
import Typography from '@material-ui/core/Typography/Typography'
import React, { Component } from 'react'
import { createBoard } from '../functions/createBoard'

class FormCreateBoard extends Component {
  isUnmounted = false

  state = {
    boardTitle: '',
    boardDescription: '',
    inProgress: false
  }

  render() {
    const { classes } = this.props
    const { boardDescription, boardTitle, inProgress } = this.state

    return (
      <CardContent>
        <Typography variant={'h5'}>New Board</Typography>
        <form onSubmit={this.onSubmit}>
          <div className={classes.formItem}>
            <TextField
              onChange={this.onChangeBoardTitle}
              value={boardTitle}
              fullWidth
              variant={'outlined'}
              placeholder={'Title'}
              disabled={inProgress}
            />
          </div>
          {boardTitle && (
            <div className={classes.formItem}>
              <TextField
                onChange={this.onChangeBoardDescription}
                value={boardDescription}
                fullWidth
                variant={'outlined'}
                placeholder={'Description (Optional)'}
                disabled={inProgress}
              />
            </div>
          )}
          <div className={classes.formItem}>
            <Button
              onClick={this.onSubmit}
              variant={'contained'}
              color={'primary'}
              disabled={inProgress || !boardTitle}
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

  onChangeBoardTitle = event => {
    this.setState({ boardTitle: event.target.value })
  }

  onChangeBoardDescription = event => {
    this.setState({ boardDescription: event.target.value })
  }

  onSubmit = event => {
    const { boardTitle, boardDescription, inProgress } = this.state

    event.preventDefault()

    if (inProgress) return

    this.setState({ inProgress: true })

    const input = { title: boardTitle, description: boardDescription }

    createBoard(input)
      .then(() => {
        if (this.isUnmounted) return
        this.setState({
          inProgress: false,
          boardDescription: '',
          boardTitle: ''
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

export default withStyles(styles)(FormCreateBoard)
