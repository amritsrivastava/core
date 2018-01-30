import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import {Switch, BrowserRouter, Route, Link, Redirect} from 'react-router-dom'

import {firebase, firebaseApp} from './firebase'
// components
import Home from './components/home'
import Verify from './components/verify'
import Register from './components/register'
import Complaint from './components/register/complaint'
import Status from './components/status'
import Success from './components/success'
import NotFound from './components/notfound'
import Org from './components/org'
import Cleanliness from './components/depts/cleanliness'
// stylesheet
import './stylesheets/styles.scss'
import './styles.css'

// assets
import LogoWhite from './images/logo-white.png'
// import LogoWhite from './images/logo-black.png'
import SwachBharat from './images/swach-bharat.png'

class Main extends Component {
  constructor (props) {
    super(props)
    this.state = {
      verified: false,
      org: null
    }
    console.log(this.props.match)

    // firebaseApp.auth().onAuthStateChanged((user) => {
    //   if (user) {
    //     this.setState({user, verified: true})
    //   } else {
    //     this.setState({verified: false})
    //   }
    // })
  }

  org(state) {
    this.setState({org: state})
  }

  render () {
    let footer = null

    if(this.state.org) {
      var orgLogo = require(`./images/orgLogos/${this.state.org}.jpg`)
      footer = (
        <div><img src={orgLogo} className='orgLogo'/></div>
      )
    } else {
      footer = (
        <div className='row nav'>
            <div className='col-1 nav-items'><Link to='/about'>About Us</Link></div>
            <div className='col-1 nav-items'><Link to='/contact'>Contact Us</Link></div>
            <div className='col-1 nav-items login'><Link to='/login'>LogIn</Link></div>
            {/* <span className='copyright'>Copyright &copy; {(new Date()).getFullYear()}</span> */}
        </div>
      )
    }

    return (
      <BrowserRouter>
        <div>
          <div className='header'>
            <Link to='/'>
              <img src={LogoWhite} className='logo' />
            </Link>
          </div>

          <div className='main'>
            <Switch>
              <Route exact path='/' component={Home} />
              <Route exact path='/verify' component={Verify} />
              <Route exact path='/register' render={() => <Register state={this.state.verified} />} />
              <Route exact path='/register/:dept' component={Complaint} />
              <Route path='/complain/:id' render={(props) => <Status {...props} />} />
              <Route path='/o/:org' render={(props) => <Org {...props} orgName={this.org.bind(this)}/>} />
              <Route path='/d/:org/:dept' component={Cleanliness} />
              {/* <Route path='/:org/verify' component={Verify} /> */}
              <Route path='/success' component={Success} />
              <Route component={NotFound} />
            </Switch>
          </div>

          <div className='footer'>
            <div className='row'>
              <div className='col-4'>
                {footer}
              </div>
              <div className='col-2'>
                <img src={SwachBharat} className='SwachBharat' />
              </div>
            </div>
          </div>
        </div>
      </BrowserRouter>
    )
  }
}

ReactDOM.render(<Main />, document.getElementById('main'))
