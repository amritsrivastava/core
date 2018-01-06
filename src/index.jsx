import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import {Switch, BrowserRouter, Route} from 'react-router-dom'

// components
import Home from './components/home'
import Verify from './components/verify'
import Register from './components/register'
import Complaint from './components/register/complaint'
import Status from './components/status'
import Success from './components/success'
import NotFound from './components/notfound'

import './styles.css'

class Main extends Component {
  constructor () {
    super()
    this.state = {
      verified: false
    }
  }

  fallback (state) {
    this.setState({verified: state})
  }

  render () {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/verify' render={() => <Verify onVerify={this.fallback.bind(this)} />} />
          <Route exact path='/register' render={() => <Register state={this.state.verified} />} />
          <Route exact path='/register/:dept' component={Complaint} />
          <Route path='/complain/:id' component={Status} />
          <Route path='/success' component={Success} />
          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
    )
  }
}

ReactDOM.render(<Main />, document.getElementById('main'))
