import React, {Component} from 'react'
import {Route, Redirect} from 'react-router-dom'

import Department from './departments'

import '../../styles.css'

class Register extends Component {
  constructor () {
    super()
    this.state = {
      redirect: false
    }
  }

  render () {
    let redirect = null

    if (!this.props.state) {
      redirect = <Redirect to='/verify' />
    }

    return (
      <div className='register'>
        <Route exact path='/'>
          {redirect}
        </Route>
        <Department />
      </div>
    )
  }
}

export default Register
