const firebase = require('firebase')
const request = require('request')

const firebaseApp = firebase.initializeApp({
  apiKey: 'AIzaSyChLKmr3hQeA6c1BJuZiQEHlXn5MxNttfg',
  authDomain: 'bharat-b4a57.firebaseapp.com',
  databaseURL: 'https://bharat-b4a57.firebaseio.com',
  projectId: 'bharat-b4a57',
  storageBucket: 'bharat-b4a57.appspot.com',
  messagingSenderId: '675514461582'
})

setInterval(() => {
  firebaseApp.database().ref('/complaints').on('value', (snapshot) => {
    var i
    for (i in snapshot.val()) {
      var data = snapshot.val()[i]
      if (!data.ack) {
        var SENDER = 'PRTKRY'
        console.log('Sending message to :', data.user, ' for: ', i)
        var message = encodeURIComponent(`Your complain with id ${i} has been registered and the status can be tracked at pratikriya.in/s/${i}`)
        var api = `https://api.msg91.com/api/sendhttp.php?sender=${SENDER}&route=4&mobiles=${data.user}&authkey=191043ADzG2M5v5a4b86bb&country=0&message=${message}`
        request(api, (err, res, body) => {
          if (err) throw err
          var updatedData = Object.assign({}, data, {ack: true})
          firebaseApp.database().ref('/complaints/' + i).set(updatedData)
        })
      }
    }
  })
}, 10000)
