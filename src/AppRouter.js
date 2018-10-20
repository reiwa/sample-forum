import React, { Component, Fragment } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import AppContent from './components/AppContent'
import AppHeader from './containers/AppHeader'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import Thread from './pages/Thread'
import Threads from './pages/Threads'

class AppRouter extends Component {
  render() {
    return (
      <BrowserRouter>
        <Fragment>
          <Route path="/" component={AppHeader} />
          <AppContent>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/:boardId" component={Threads} />
              <Route
                exact
                path="/:boardId/threads/:threadId"
                component={Thread}
              />
              <Route path="*" component={NotFound} />
            </Switch>
          </AppContent>
        </Fragment>
      </BrowserRouter>
    )
  }

  componentDidMount() {}
}

export default AppRouter
