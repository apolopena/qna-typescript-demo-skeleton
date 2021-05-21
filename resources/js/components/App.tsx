import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import './App.css'
import { Questions, Answers, NotFound } from '../pages'

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/'>
          <Questions />
        </Route>
        <Route path='/answers'>
          <Answers />
        </Route>
        <Route path='*'>
          <NotFound />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

ReactDOM.render(<App />, document.getElementById('app'))