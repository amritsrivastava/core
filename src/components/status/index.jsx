import React, {Component} from 'react'

import {firebaseApp} from '../../firebase'

class Status extends Component {
  constructor (props) {
    super(props)
    this.state = {
      id: props.match.params.id
    }

    firebaseApp.database().ref('/complaints/' + this.state.id).once('value').then((snapshot) => {
      // this.setState({data: Object.assign({}, this.state.data, snapshot.val())})
      this.setState({
        name: snapshot.val().name,
        issue: snapshot.val().issue,
        dept: snapshot.val().dept,
        flag: true
      })
    })
  }

  render () {
    let content = <div loading />

    if (this.state.flag) {
      content = <div><div>{this.state.name}</div><div>{this.state.issue}</div><div>{this.state.dept}</div></div>
    }

    return (
      <div>
        {content}
      </div>
    )
  }
}

export default Status
