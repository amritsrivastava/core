import React from 'react'

import './styles.css'

class Success extends React.Component {
  render () {
    return (
      <div>
        <div className='success-message checkmark-circle'>
          <div className='background'></div>
          <div className='checkmark draw'></div>
        </div>
        <p>We've sent the Complain ID and tracking info to your mobile number.</p>
      </div>
    )
  }
}

export default Success
