import React from 'react'
import {Route, Redirect, Switch} from 'react-router-dom'

import {firebaseApp} from '../../firebase'

import randomstring from 'randomstring'
import https from 'https'
import querystring from 'querystring'

export default class Cleanliness extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      data: {
        id: null,
        mobile: null,
        dept: props.match.params.dept,
        name: null,
        subject: null,
        location: null,
        description: null,
        org: props.match.params.org
      },
      redirect: false
    }
    firebaseApp.auth().onAuthStateChanged((user) => {
      if (user) {
        var id = randomstring.generate(6)
        var data = Object.assign({}, this.state.data, {org: 'jecrc', id: id, mobile: user.phoneNumber})
        this.setState({data})
      } else {
        this.setState({redirect: true})
      }
    })
  }

  handleValue (event) {
    var data = Object.assign({}, this.state.data, {[event.target.name]: event.target.value})
    this.setState({data})
  }

  save (e) {
    var query = querystring.stringify(this.state.data)
    console.log(query)
    https.get(`https://81fwd1on3h.execute-api.ap-south-1.amazonaws.com/dev/post?${query}`, (err, res, body) => {
      if (err) throw err
      console.log(body)
    })
    this.setState({redirect: true})
    e.preventDefault()
  }

  render () {
    let redirect = null

    if (this.state.redirect) {
      return (<Redirect to={{
        pathname: '/success'
      }} />)
    }

    return (
      <div className='dept-page'>
        <h2>Report a Complain</h2>
        <form onSubmit={this.save.bind(this)}>
          <input type='text' required onChange={this.handleValue.bind(this)} className='form-el' name='name' placeholder='Your name' />
          <input type='text' required onChange={this.handleValue.bind(this)} className='form-el' name='subject' placeholder='Subject' />
          <input type='text' list='locations' required onChange={this.handleValue.bind(this)} className='form-el' name='location' placeholder='Location' />
          <datalist id='locations'>
            <option value='A-Block' />
            <option value='B-Block' />
            <option value='C-Block' />
          </datalist>
          <input type='text' required onChange={this.handleValue.bind(this)} className='form-el' name='description' placeholder='Description' />
          <input type='file' className='form-el' name='File Upload' />
          <button type='submit'>Submit</button>
        </form>
      </div>
    )
  }
}
