import React from 'react'

function Mobile (props) {
  return (
    <div className='form'>
      <form onSubmit={props.onSubmit}>
        <input type='tel' maxLength='10' minLength='10' placeholder='Phone Number' onChange={props.onChange} />
        <div id='recaptcha' />
        <button className='right shadow-1' onClick={props.onSubmit} id='otp'>
            Get OTP
          </button>
      </form>
    </div>
  )
}

export default Mobile
