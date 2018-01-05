const express = require('express')
const path = require('path')
const compress = require('compression')

const messaging = require('./bin/messaging')

const app = express()
const PORT = process.env.PORT || 3000

app.use(compress())
app.use(express.static(path.resolve(__dirname, 'dist/')))

app.get('*', function (request, response) {
  response.sendFile(path.resolve(__dirname, 'dist/', 'index.html'))
})

app.listen(PORT, function () {
  console.log(`Listening on port ${PORT}`)
})
