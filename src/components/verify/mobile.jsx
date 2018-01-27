import React from 'react'

function Mobile(props) {
  return (
    <div className='form'>
      <form onSubmit={props.onSubmit}>
        <input type='text' className='shadow-half' placeholder='Enter your name' onChange={props.name}/>
        <input type='tel' className='shadow-half' maxLength='10' minLength='10' placeholder='Mobile Number' onChange={props.onChange}/>
        <div id='recaptcha'/>
        <button className='shadow-1' onClick={props.onSubmit} id='otp'>
          Get OTP
        </button>
      </form>
    </div>
  )
}

export default Mobile
