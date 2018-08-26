
var moment = require('moment')

module.exports = function (req, res, next) {

    params = {}
    var workinghours = req.query.workinghours
    if (workinghours !== undefined) {
        params.workinghours = JSON.parse(workinghours)
    }
    else {
        //defualt working hours
        params.workinghours = {
            0: null,
            1: ["09:00:00", "17:00:00"],
            2: ["09:00:00", "17:00:00"],
            3: ["09:00:00", "17:00:00"],
            4: ["09:00:00", "17:00:00"],
            5: ["09:00:00", "17:00:00"],
            6: null
        }
    }

    moment.updateLocale('en', params);

    //var holidays = ['2015-05-04']

    req.query = {
        date: moment(req.query.date, req.query.format),
        format: req.query.format,
        amount: req.query.amount === undefined ? undefined : Number(req.query.amount),
        units: req.query.units || 'days',
        outputFormat: req.query.outputFormat || req.query.format,
        workinghours: params.workinghours
    }

    next();
}