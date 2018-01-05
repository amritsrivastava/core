import React from 'react'

function Otp (props) {
  return (
    <div className='form'>
      <form onSubmit={props.onSubmit}>
        <input placeholder='Enter the OTP' maxLength='6' minLength='6' onChange={props.onChange} /><br />
        <button onClick={props.onSubmit} className='shadow-1'>
          Verify
        </button>
      </form>
    </div>
  )
}

export default Otp
