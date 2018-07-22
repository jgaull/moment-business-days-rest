
var express = require('express')
var bodyParser = require('body-parser')
var moment = require('moment-business-days')

//setup routes
var app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/business-add', function (req, res) {

    var params = parseRequest(req)

    res.send({
        date: moment(params.date, params.format).businessAdd(params.amount).format(params.outputFormat),
        params: params
    })
})

app.use('/business-subtract', function (req, res) {

    var params = parseRequest(req)

    res.send({
        date: moment(params.date, params.format).businessSubtract(params.amount).format(params.outputFormat),
        params: params
    })
})

app.use('/is-business-day', function (req, res) {

    var params = parseRequest(req)

    res.send({
        isBusinessDay: moment(params.date, params.format).isBusinessDay(),
        params: params
    })
})

app.use('/next-business-day', function (req, res) {

    var params = parseRequest(req)

    res.send({
        date: moment(params.date, params.format).nextBusinessDay().format(params.outputFormat),
        params: params
    })
})

app.use('/prev-business-day', function (req, res) {

    var params = parseRequest(req)

    res.send({
        date: moment(params.date, params.format).prevBusinessDay().format(params.outputFormat),
        params: params
    })
})

function parseRequest(req) {

    return {
        date: req.query.date,
        format: req.query.format,
        amount: req.query.amount,
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