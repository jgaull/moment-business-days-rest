
var express = require('express')
var bodyParser = require('body-parser')

var parseRequest = require('./middleware/parse-request')
var getConfig = require('./middleware/get-config')
var runFunction = require('./middleware/run-function')

//setup routes
var app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(parseRequest)

app.get('/:functionKey', getConfig, runFunction)

//start the server
var port = process.env.PORT || 8888
var server = require('http').createServer(app)
server.listen(port, function () {
    console.log('Express server listening on %d', port)
})

//public API
module.exports.server = server