
var camelcase = require('camelcase')
var _ = require('lodash')

var config = {
    addWorkingTime: {
        responseKey: 'date',
        args: ['amount', 'units']
    },
    subtractWorkingTime: {
        responseKey: 'date',
        args: ['amount', 'units']
    },
    isWorkingDay: {
        responseKey: 'isWorkingDay'
    },
    isWorkingTime: {
        responseKey: 'isWorkingTime'
    },
    workingDiff: {
        responseKey: 'diff',
        args: ['toDate', 'units']
    }
}

module.exports = function (req, res, next) {

    var params = req.params

    var functionKey = camelcase(params.functionKey)
    var functionConfig = config[functionKey]

    if (functionConfig === undefined) {
        functionConfig = {}
    }

    if (functionConfig.responseKey === undefined) {
        functionConfig.responseKey = 'date'
    }

    var args = []
    _.each(functionConfig.args, function (path) {
        args.push(_.get(req.query, path, undefined))
    })

    params.functionKey = functionKey
    params.args = args
    params.responseKey = functionConfig.responseKey

    next();
}