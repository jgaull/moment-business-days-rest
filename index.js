
var express = require('express')
var bodyParser = require('body-parser')
var moment = require('moment-business-time')
var parseRequest = require('./middleware/parse-request')
var getConfig = require('./middleware/get-config')
var camelcase = require('camelcase')
var _ = require('lodash');

//setup routes
var app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(parseRequest)

app.get('/:functionKey', getConfig, function (req, res) {

    var params = req.query

    var date = params.date.clone()
    var runFunction = date[req.params.functionKey]
    if (typeof runFunction !== 'function') {
        throw req.params.functionKey + 'is not a supported API endpoint'
    }

    var result = runFunction.apply(date, req.params.args)
    if (moment.isMoment(result)) {
        result = result.format(params.outputFormat)
    }

    res.send({
        [req.params.responseKey]: result,
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