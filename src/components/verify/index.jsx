import React, {Component} from 'react'
import {Route, Redirect, Link} from 'react-router-dom'

import {firebase, firebaseApp} from '../../firebase'

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

        var user = firebase.auth().currentUser
        user.updateProfile({displayName: name})
        
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

  name (event) {
    var name = event.target.value
    this.setState({name: name})
    // var user = firebase.auth().currentUser
    //
    // user.updateProfile({displayName: name})
  }

  render () {
    let form = null
    let redirect = null

    if (this.state.otpSend) {
      form = <Otp onChange={this.handleOTP.bind(this)} onSubmit={this.verify.bind(this)} />
    } else {
      form = <Mobile onChange={this.handlePhone.bind(this)} onSubmit={this.send.bind(this)} state={this.state.request} name={this.name.bind(this)} />
    }

    if (this.state.redirect) {
      redirect = <Redirect to='/register' />
    }

    return (
      <div className='main-content verify-page'>
        <div id='ack'>
          <p>Please authenticate yourself</p>
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
