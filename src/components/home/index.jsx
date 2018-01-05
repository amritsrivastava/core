import React, {Component} from 'react'
import {Route, Redirect, Link} from 'react-router-dom'

import MDFeedback from 'react-icons/lib/md/feedback'
import MDAccountBox from 'react-icons/lib/md/account-box'

// home page styling
import './styles.css'

import LogoWhite from '../../images/logo-white.png'

class Home extends Component {
  constructor () {
    super()
    this.state = {
      id: ''
    }
  };

  search (event) {
    this.setState({redirect: true})
  }

  handleID (event) {
    this.setState({id: event.target.value})
  }

  render () {
    let redirect = null

    if (this.state.redirect) {
      redirect = <Redirect to={`/s/${this.state.id}`} />
    }

    return (
      <div>
        <Route exact path='/'>
          {redirect}
        </Route>
        <div className='header'>
          <img src={LogoWhite} className='logo' />
        </div>
        <div className='main'>
          <form onSubmit={this.search.bind(this)}>
            <input
              type='text'
              className='shadow-1 center'
              placeholder='Enter complaint ID'
              onChange={this.handleID.bind(this)} />
          </form>
          <div className='container navigation'>
            <Link to='/verify' className='col white-text'>
              <div className='center-text'>
                <MDFeedback /><br />Complaint
              </div>
            </Link>
            <Link to='/profile' className='col white-text'>
              <div className='center-text'>
                <MDAccountBox /><br />Your Complaints
              </div>
            </Link>
          </div>
        </div>
      </div>
    )
  }
}

export default Home
