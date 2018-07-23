
var express = require('express')
var bodyParser = require('body-parser')
var moment = require('moment-business-time')

//setup routes
var app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/add-working-time', function (req, res) {

    var params = parseRequest(req)

    res.send({
        date: params.date.clone().addWorkingTime(params.amount, params.units).format(params.outputFormat),
        params: params
    })
})

app.use('/subtract-working-time', function (req, res) {

    var params = parseRequest(req)

    res.send({
        date: params.date.clone().subtractWorkingTime(params.amount, params.units).format(params.outputFormat),
        params: params
    })
})

app.use('/is-working-day', function (req, res) {

    var params = parseRequest(req)

    res.send({
        isWorkingDay: params.date.isWorkingDay(),
        params: params
    })
})

app.use('/is-working-time', function (req, res) {

    var params = parseRequest(req)

    res.send({
        isWorkingTime: params.date.isWorkingTime(),
        params: params
    })
})

app.use('/next-working-day', function (req, res) {

    var params = parseRequest(req)

    res.send({
        date: params.date.clone().nextWorkingDay().format(params.outputFormat),
        params: params
    })
})

app.use('/last-working-day', function (req, res) {

    var params = parseRequest(req)

    res.send({
        date: params.date.clone().lastWorkingDay().format(params.outputFormat),
        params: params
    })
})

function parseRequest(req) {

    return {
        date: moment(req.query.date, req.query.format),
        format: req.query.format,
        amount: req.query.amount === undefined ? undefined : Number(req.query.amount),
        units: req.query.units || 'days',
        outputFormat: req.query.outputFormat || req.query.format
    }
}

//start the server
var port = process.env.PORT || 8888
var server = require('http').createServer(app)
server.listen(port, function () {
    console.log('Express server listening on %d', port)
})

//public API
module.exports.server = server