import React, { Component, Fragment } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import AppContent from './components/AppContent'
import AppHeader from './containers/AppHeader'
import HomePage from './pages/HomePage'
import NotFoundPage from './pages/NotFoundPage'
import ThreadPage from './pages/ThreadPage'
import ThreadsPage from './pages/ThreadsPage'

class AppRouter extends Component {
  render() {
    return (
      <BrowserRouter>
        <Fragment>
          <Route path="/" component={AppHeader} />
          <AppContent>
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route exact path="/:boardId" component={ThreadsPage} />
              <Route
                exact
                path="/:boardId/threads/:threadId"
                component={ThreadPage}
              />
              <Route path="*" component={NotFoundPage} />
            </Switch>
          </AppContent>
        </Fragment>
      </BrowserRouter>
    )
  }

  componentDidMount() {}
}

export default AppRouter
