import React, {Component} from 'react'
import {Route, Redirect, Switch} from 'react-router-dom'

import {firebaseApp} from '../../firebase'

import randomstring from 'randomstring'

class Complaint extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data: {
        user: null,
        dept: props.match.params.dept,
        name: null,
        subject: null,
        location: null,
        description: null,
        ack: false
      },
      redirect: false
    }
    firebaseApp.auth().onAuthStateChanged((user) => {
      if (user) {
        var data = Object.assign({}, this.state.data, {user: user.phoneNumber})
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
    var id = randomstring.generate(6)
    firebaseApp.database().ref('/complaints/' + id).set(this.state.data)
    this.setState({
      id,
      redirect: true
    })
    e.preventDefault()
  }

  submit (e) {
    firebaseApp.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log('user', user)
        var data = Object.assign({}, this.state.data, {user: user.uid})
        this.setState({data})
        console.log(data)
        this.save()
      } else {
        this.setState({redirect: true})
      }
    })
    e.preventDefault()
  }

  render () {
    let redirect = null

    if (this.state.redirect) {
      console.log(this.state.id)
      return (<Redirect to={{
        pathname: '/success'
      }} />)
    }

    return (
      <div>
        <Switch>
          <Route exact path='/'>
            {redirect}
          </Route>
        </Switch>
        <div className='form-pages'>
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
      </div>
    )
  }
}

export default Complaint
