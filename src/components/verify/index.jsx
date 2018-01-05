import React, {Component} from 'react'
import {Route, Redirect, Link} from 'react-router-dom'

import {firebase, firebaseApp} from '../../firebase'
import '../../styles.css'

import LogoWhite from '../../images/logo-white.png'

import Mobile from './mobile'
import Otp from './otp'

class Verify extends Component {
  constructor () {
    super()
    this.state = {
      phoneNumber: '',
      otpSend: false,
      otp: '',
      request: false,
      step: 1,
      loggedin: false,
      display: 'block'
    }

    setTimeout(() => {
      this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha', {
        'size': 'invisible',
        'callback': (response) => {
          console.log('recaptcha')
        },
        'expired-callback': () => {
          console.log('expired')
        }
      })
      this.recaptchaVerifier.render().then(function (widgetId) {
        window.recaptchaWidgetId = widgetId
      })
    }, 1000)
  }

  send (event) {
    firebaseApp.auth().signInWithPhoneNumber(this.state.phoneNumber, this.recaptchaVerifier)
    .then((confirmationResult) => {
      this.setState({
        otpSend: true,
        confirmationResult
      })
    }).catch((error) => {
      console.log(error)
    })
    event.preventDefault()
  }

  verify (event) {
    this.state.confirmationResult.confirm(this.state.otp)
      .then((result) => {
        this.props.onVerify(true)
        this.setState({redirect: true})
      })
      .catch((error) => {
        console.error(error)
      })
    event.preventDefault()
  }

  handlePhone (event) {
    this.setState({phoneNumber: `+91${event.target.value}`})
  }

  handleOTP (event) {
    this.setState({otp: event.target.value})
  }

  render () {
    let form = null
    let redirect = null

    if (this.state.otpSend) {
      form = <Otp onChange={this.handleOTP.bind(this)} onSubmit={this.verify.bind(this)} />
    } else {
      form = <Mobile onChange={this.handlePhone.bind(this)} onSubmit={this.send.bind(this)} state={this.state.request} />
    }

    if (this.state.redirect) {
      redirect = <Redirect to='/register' />
    }

    return (
      <div className='page'>
        <Link to='/'>
          <img src={LogoWhite} className='logo' />
        </Link>
        <div id='ack'>
          <p>Please verify your<br /> phone number</p>
        </div>
        {form}
        <Route exact path='/'>
          {redirect}
        </Route>
      </div>
    )
  };
}

export default Verify
