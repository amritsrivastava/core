import React from 'react'
import {BrowserRouter, Route, Redirect, Link} from 'react-router-dom'

import {firebase, firebaseApp} from '../../firebase'

import Verify from '../verify'

export default class Org extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      org: props.match.params.org,
      verified: false
    }

    this.props.orgName(this.state.org)

    firebaseApp.auth().onAuthStateChanged((user) => {
      if (!user) {
        this.setState({user, verified: true})
      } else {
        this.setState({verified: false})
      }
    })
  }

  verify(state){
    this.setState({verified: state})
  }

  render() {
    let department = null
    let redirect = null

    if(!this.state.verified){
      // redirect = <Redirect to={`/verify/${this.state.org}`} />
      department = <Verify onVerify={this.verify.bind(this)} />
    } else{
      var dept = ['security', 'library', 'transportation', 'cleanliness', 'grievance', 'accounts', 'hostel', 'clubs', 'ragging']

      dept.sort();

      department = dept.map((i, key) => {
        var classes = `${i} col-2 dept shadow-1`
        var image = require(`../../images/icons/${i}.svg`)
        var svgs = null
        return (
          <Link to={`/d/${this.state.org}/${i}`}>
            <div className={classes} key='key'>
              <img className='dept-icon' src={image} width='50px'/><br />
              {i}
            </div>
          </Link>
        )
      })
    }

    return (
      <BrowserRouter>
        <div className='main-content org-page'>
            <h1>{this.state.id}</h1>
            <Route exact path='/'>
              {redirect}
            </Route>
            <div class='row wrap'>
              {department}
            </div>
        </div>
      </BrowserRouter>
    )
  }
}
