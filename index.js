
var express = require('express')
var bodyParser = require('body-parser')
var moment = require('moment-business-time')
var parseRequest = require('./parse-request')

//setup routes
var app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(parseRequest);

app.get('/add-working-time', function (req, res) {

    var params = req.query

    res.send({
        date: params.date.clone().addWorkingTime(params.amount, params.units).format(params.outputFormat),
        params: params
    })
})

app.get('/subtract-working-time', function (req, res) {

    var params = req.query

    res.send({
        date: params.date.clone().subtractWorkingTime(params.amount, params.units).format(params.outputFormat),
        params: params
    })
})

app.get('/is-working-day', function (req, res) {

    var params = req.query

    res.send({
        isWorkingDay: params.date.isWorkingDay(),
        params: params
    })
})

app.get('/is-working-time', function (req, res) {

    var params = req.query

    res.send({
        isWorkingTime: params.date.isWorkingTime(),
        params: params
    })
})

app.get('/next-working-day', function (req, res) {

    var params = req.query

    res.send({
        date: params.date.clone().nextWorkingDay().format(params.outputFormat),
        params: params
    })
})

app.get('/next-working-time', function (req, res) {

    var params = req.query

    res.send({
        date: params.date.clone().nextWorkingTime().format(params.outputFormat),
        params: params
    })
})

app.get('/last-working-day', function (req, res) {

    var params = req.query

    res.send({
        date: params.date.clone().lastWorkingDay().format(params.outputFormat),
        params: params
    })
})

app.get('/last-working-time', function (req, res) {

    var params = req.query

    res.send({
        date: params.date.clone().lastWorkingTime().format(params.outputFormat),
        params: params
    })
})

//start the server
var port = process.env.PORT || 8888
var server = require('http').createServer(app)
server.listen(port, function () {
    console.log('Express server listening on %d', port)
})

//public API
module.exports.server = server