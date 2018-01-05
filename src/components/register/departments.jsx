import React, {Component} from 'react'
import {Link} from 'react-router-dom'

import {firebaseApp} from '../../firebase'

class Department extends Component {
  constructor () {
    super()
    this.state = {
      depts: [],
      flag: false
    }

    firebaseApp.database().ref('/dept').once('value').then((snapshot) => {
      this.setState({
        depts: snapshot.val(),
        flag: true
      })
    })
  }

  render () {
    let depts = <div loading />

    if (this.state.flag) {
      depts = this.state.depts.map((dept, i) =>
        <Link to={{
          pathname: '/register/' + dept.id
        }}>
          <div key={i} color={dept.color}>{dept.name}</div>
        </Link>
      )
    }

    return (
      <div className='form-pages'>
        <h3 className='ack'>Choose Department</h3>
        {depts}
      </div>
    )
  }
}

export default Department
