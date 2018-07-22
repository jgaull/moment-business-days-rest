
var express = require('express')
var bodyParser = require('body-parser')
var moment = require('moment-business-days')

//setup routes
var app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/business-add', function (req, res) {

    var date = req.query.date
    var format = req.query.format
    var amount = req.query.amount

    res.send({
        date: moment(date, format).businessAdd(amount).format(format)
    })
})

app.use('/business-subtract', function (req, res) {

    var date = req.query.date
    var format = req.query.format
    var amount = req.query.amount

    res.send({
        date: moment(date, format).businessSubtract(amount).format(format)
    })
})

app.use('/is-business-day', function (req, res) {

    var date = req.query.date
    var format = req.query.format

    res.send({
        isBusinessDay: moment(date, format).isBusinessDay()
    })
})

app.use('/next-business-day', function (req, res) {

    var date = req.query.date
    var format = req.query.format

    res.send({
        date: moment(date, format).nextBusinessDay().format(format)
    })
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