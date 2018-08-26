
var moment = require('moment-business-time')

module.exports = function (req, res) {

    var params = req.query
    var date = params.date.clone()
    var runFunction = date[req.params.functionKey]
    if (typeof runFunction !== 'function') {
        throw req.params.functionKey + ' is not a supported API endpoint'
    }

    var result = runFunction.apply(date, req.params.args)
    if (moment.isMoment(result)) {
        result = result.format(params.outputFormat)
    }

    res.send({
        [req.params.responseKey]: result,
        params: params
    })
}