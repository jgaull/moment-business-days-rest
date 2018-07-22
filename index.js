
var express = require('express')
var bodyParser = require('body-parser')

//setup routes
var app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/business-add', function (req, res) {
    res.send({})
})

app.use('/business-subtract', function (req, res) {
    res.send({})
})

app.use('/is-business-day', function (req, res) {
    res.send({})
})

app.use('/next-business-day', function (req, res) {
    res.send({})
})

app.use('/prev-business-day', function (req, res) {
    res.send({})
})

//start the server
var port = process.env.PORT || 8888
var server = require('http').createServer(app)
server.listen(port, function () {
    console.log('Express server listening on %d', port)
})

//public API
module.exports.server = server