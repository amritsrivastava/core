import React, {Component} from 'react'

// import {firebaseApp} from '../../firebase'
// import https from 'https'

class Status extends Component {
  constructor (props) {
    super(props)
    this.state = {
      id: props.match.params.id
    }

    // https.get(`https://81fwd1on3h.execute-api.ap-south-1.amazonaws.com/dev/track?id=${props.match.params.id}`, (res) => {
    //   console.log(res)
    // })
  }

  render () {
    // let content = <div loading />
    //
    // if (this.state.flag) {
    //   content = <div><div>{this.state.name}</div><div>{this.state.issue}</div><div>{this.state.dept}</div></div>
    // }

    return (
      <div>
        <h1>Hello</h1>
      </div>
    )
  }
}

export default Status
