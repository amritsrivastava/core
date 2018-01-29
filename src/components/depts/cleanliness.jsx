import React from 'react'
import {Route, Redirect, Switch} from 'react-router-dom'
require('isomorphic-fetch');

import FaCloudUpload from 'react-icons/lib/fa/cloud-upload'

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
      redirect: false,
      indoor: false
    }
    firebaseApp.auth().onAuthStateChanged((user) => {
      if (user) {
        var id = randomstring.generate(6)
        var name = user.displayName ? user.displayName : 'Dummy'
        var data = Object.assign({}, this.state.data, {id: id, mobile: user.phoneNumber, name: name})
        console.log(data)
        this.setState({data, id: id})
      } else {
        // this.setState({redirect: true})
      }
    })
  }

  handleValue (event) {
    var data = Object.assign({}, this.state.data, {[event.target.name]: event.target.value})
    this.setState({data})
  }
  //
  save (e) {
    var query = querystring.stringify(this.state.data)
    console.log(query)
    fetch(`https://81fwd1on3h.execute-api.ap-south-1.amazonaws.com/dev/post?${query}`)
    .then((res) => {
      console.log(res)
    })
    this.setState({redirect: true})
    e.preventDefault()
  }

  success(pos) {
    var crd = pos.coords;
    var lat = crd.latitude;
    var lng = crd.longitude;
    console.log(`Latitude : ${lat}`);
    console.log(`Longitude: ${lng}`);
    var data = Object.assign({}, this.state.data, {location: lat + lng})
    this.setState({data})
  }

  error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  location() {
    if(navigator.geolocation){
      console.log('Hurray! Your browser supports Geolocation API');
      navigator.geolocation.getCurrentPosition(this.success, this.error, {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      });
    } else{
      alert('Your browser doesn\'t support geolocation');
    }
  }

  area (e) {
    var area = e.target.value

    if (area == 'outdoor') {
      this.setState({indoor: false})
      this.location()
    } else if (area == 'indoor') {
      this.setState({indoor: true})
    }
  }

  indoor (e) {
    var place = e.target.value
    this.setState({indoorPlace: place})
    var data = Object.assign({}, this.state.data, {location: place})
    this.setState({data})
  }

  render () {
    let redirect = null
    let indoor = null
    let indoorSub = null

    if(this.state.indoor) {
      indoor = (
        <select className='shadow-1' required onChange={this.indoor.bind(this)} >
          <option default>Select Place</option>
          <option value='dustbin'>Dustbin</option>
          <option value='washroom'>Washroom / Toilet</option>
          <option value='rooms'>Room</option>
          <option value='corridor'>Corridor</option>
        </select>
      )
    }

    switch(this.state.indoorPlace){
      case 'dustbin':
        indoorSub = <input className='shadow-1' type='text' placeholder='Floor / Wing' required onChange={this.handleValue.bind(this)} name='subject' />
        break;
      case 'washroom':
        indoorSub = <input className='shadow-1' type='text' placeholder='Floor / Wing' required onChange={this.handleValue.bind(this)} name='subject' />
        break;
      case 'rooms':
        indoorSub = <input className='shadow-1' type='text' placeholder='Room no.' required onChange={this.handleValue.bind(this)} name='subject' />
        break;
      case 'corridor':
        indoorSub = <input className='shadow-1' type='text' placeholder='Floor / Wing' required onChange={this.handleValue.bind(this)} name='subject' />
        break;
      default:
        console.log('nothing selected')
    }

    if (this.state.redirect) {
      return (<Redirect to={{
        pathname: '/success'
      }} />)
    }

    return (
      <div className='dept-page'>
        <h2>Report a Complain</h2>
        <form onSubmit={this.save.bind(this)}>
          <select required className='shadow-1' onChange={this.area.bind(this)}>
            <option default>Area</option>
            <option value='outdoor'>Outdoor</option>
            <option value='indoor'>Indoor</option>
          </select>
          {indoor}
          {indoorSub}
          <input type='text' placeholder='Other info' className='shadow-1' onChange={this.handleValue.bind(this)} name='description' />
          <label className='shadow-1' for="file-upload">
            <FaCloudUpload /> Upload Image
          </label>
          <input id='file-upload' type='file' className='shadow-1' name='File Upload' accept="image/png, image/jpg, image/jpeg" />
          <button className='shadow-1' type='submit'>Submit</button>
        </form>
        {/* <form onSubmit={this.save.bind(this)}>
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
        </form> */}
      </div>
    )
  }
}
