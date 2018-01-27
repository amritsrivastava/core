import React, {Component} from 'react'
import {Route, Redirect, Link} from 'react-router-dom'
import * as _ from 'lodash'
import createHistory from "history/createBrowserHistory"

// home page styling
import './styles.css'

const history = createHistory()

class Home extends Component {
  constructor () {
    super()
    this.state = {
      id: ''
    }
    this.success = this.success.bind(this)
    this.error = this.error.bind(this)
  };

  handleInput(e){
    console.log(e.target.value)
    history.push('/')
    this.setState({
      redirect: true,
      id: e.target.value
    })
  }

  success(pos) {
    var crd = pos.coords;
    var lat = crd.latitude;
    var lng = crd.longitude;
    console.log(`Latitude : ${lat}`);
    console.log(`Longitude: ${lng}`);
    if(_.inRange(lat, 26.7594378, 26.8042138) && _.inRange(lng, 75.8052643, 75.8435703)){
      this.setState({
        redirect: true,
        id: 'jecrc'
      })
    } else{
      console.log('somehwere');
    }
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

  render () {
    let redirect = null

    if (this.state.redirect) {
      redirect = <Redirect to={`/o/${this.state.id}`} />
    }

    return (
      <div className='main-content home'>
        <Route exact path='/'>
          {redirect}
        </Route>
        <div className='wrapper'>
          <span>Enter your college</span>
          <button className='wrap-item location shadow-1' onClick={this.location.bind(this)}>
            Use my Current Location
          </button>
          <span className='wrap-item'>OR</span>
          <div className='wrap-item'>
            {/* <input type='search' list='locations' onSearch={this.handleInput.bind(this)}></input> */}
            <select className='shadow-1' onChange={this.handleInput.bind(this)} id='locations'>
              <option default>Select manually</option>
              <option value='jecrc'>JECRC</option>
              <option value='ju'>JECRC University</option>
            </select>
          </div>
        </div>
      </div>
    )
  }
}

export default Home
