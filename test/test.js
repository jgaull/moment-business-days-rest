
var request = require('supertest')
var assert = require('assert')

describe('business-days', function () {

    this.timeout(2000)

    var server = require('../index').server

    it('adds 1 business day', function (done) {

        var date = '20-07-2018' //Friday
        var format = 'DD-MM-YYYY'

        request(server)
            .get('/add-working-time?date=' + date + '&format=' + format + '&amount=1')
            //.expect(200)
            .then(function (res) {

                assert(res)
                assert(res.text)

                var actual = JSON.parse(res.text)
                assert(actual)

                var expected = {
                    "date": "23-07-2018",
                    "params": {
                        "date": "2018-07-20T07:00:00.000Z",
                        "format": "DD-MM-YYYY",
                        "amount": 1,
                        "units": "days",
                        "outputFormat": "DD-MM-YYYY",
                        "workinghours": {
                            "0": null,
                            "1": ["09:00:00", "17:00:00"],
                            "2": ["09:00:00", "17:00:00"],
                            "3": ["09:00:00", "17:00:00"],
                            "4": ["09:00:00", "17:00:00"],
                            "5": ["09:00:00", "17:00:00"],
                            "6": null
                        }
                    }
                }
                //console.log('actual: ' + JSON.stringify(actual))
                assert.deepEqual(actual, expected)
                done()

            }).catch(function (e) {
                done(e)
            })
    })

    it('subtracts 1 business day', function (done) {

        var date = '23-07-2018' //Monday
        var format = 'DD-MM-YYYY'

        request(server)
            .get('/subtract-working-time?date=' + date + '&format=' + format + '&amount=1')
            .expect(200)
            .then(function (res) {

                assert(res)
                assert(res.text)

                var actual = JSON.parse(res.text)
                assert(actual)
                
                var expected = {
                    "date": "20-07-2018",
                    "params": {
                        "date": "2018-07-23T07:00:00.000Z",
                        "format": "DD-MM-YYYY",
                        "amount": 1,
                        "units": "days",
                        "outputFormat": "DD-MM-YYYY",
                        "workinghours": {
                            "0": null,
                            "1": ["09:00:00", "17:00:00"],
                            "2": ["09:00:00", "17:00:00"],
                            "3": ["09:00:00", "17:00:00"],
                            "4": ["09:00:00", "17:00:00"],
                            "5": ["09:00:00", "17:00:00"],
                            "6": null
                        }
                    }
                }
                //console.log('actual: ' + JSON.stringify(actual))
                assert.deepEqual(actual, expected)
                done()

            }).catch(function (e) {
                done(e)
            })
    })

    it('tests if it is a business day', function (done) {

        var date = '22-07-2018' //Monday
        var format = 'DD-MM-YYYY'

        request(server)
            .get('/is-working-day?date=' + date + '&format=' + format)
            .expect(200)
            .then(function (res) {

                assert(res)
                assert(res.text)

                var actual = JSON.parse(res.text)
                assert(actual)
                
                var expected = {
                    "isWorkingDay": false,
                    "params": {
                        "date": "2018-07-22T07:00:00.000Z",
                        "format": "DD-MM-YYYY",
                        "units": "days",
                        "outputFormat": "DD-MM-YYYY",
                        "workinghours": {
                            "0": null,
                            "1": ["09:00:00", "17:00:00"],
                            "2": ["09:00:00", "17:00:00"],
                            "3": ["09:00:00", "17:00:00"],
                            "4": ["09:00:00", "17:00:00"],
                            "5": ["09:00:00", "17:00:00"],
                            "6": null
                        }
                    }
                }
                //console.log('actual: ' + JSON.stringify(actual))
                assert.deepEqual(actual, expected)
                done()

            }).catch(function (e) {
                done(e)
            })
    })

    it('tests if a date is within business hours', function (done) {

        var date = '23-07-2018 18:00:00-7:00' //Monday
        var format = 'DD-MM-YYYY HH:mm:ssZ'
        var workinghours = JSON.stringify({
            0: null,
            1: ["10:00:00", "18:00:00"],
            2: ["10:00:00", "18:00:00"],
            3: ["10:00:00", "18:00:00"],
            4: ["10:00:00", "18:00:00"],
            5: ["10:00:00", "18:00:00"],
            6: null
        })

        request(server)
            .get('/is-working-time?date=' + date + '&format=' + format + '&workinghours=' + workinghours)
            .expect(200)
            .then(function (res) {

                assert(res)
                assert(res.text)

                var actual = JSON.parse(res.text)
                assert(actual)

                var expected = {
                    isWorkingTime: true,
                    params: {
                        date: '2018-07-24T01:00:00.000Z',
                        format: format,
                        outputFormat: format,
                        units: 'days',
                        workinghours: {
                            0: null,
                            1: ["10:00:00","18:00:00"],
                            2: ["10:00:00","18:00:00"],
                            3: ["10:00:00","18:00:00"],
                            4: ["10:00:00","18:00:00"],
                            5: ["10:00:00","18:00:00"],
                            6: null
                        }
                    }
                }
                //console.log('actual: ' + JSON.stringify(actual))
                assert.deepEqual(actual, expected)
                done()

            }).catch(function (e) {
                done(e)
            })
    })

    it('returns the next business day', function (done) {

        var date = '20-07-2018' //Friday
        var format = 'DD-MM-YYYY'

        request(server)
            .get('/next-working-day?date=' + date + '&format=' + format)
            .expect(200)
            .then(function (res) {

                assert(res)
                assert(res.text)

                var actual = JSON.parse(res.text)
                assert(actual)
                
                var expected = {
                    "date": "23-07-2018",
                    "params": {
                        "date": "2018-07-20T07:00:00.000Z",
                        "format": "DD-MM-YYYY",
                        "units": "days",
                        "outputFormat": "DD-MM-YYYY",
                        "workinghours": {
                            "0": null,
                            "1": ["09:00:00", "17:00:00"],
                            "2": ["09:00:00", "17:00:00"],
                            "3": ["09:00:00", "17:00:00"],
                            "4": ["09:00:00", "17:00:00"],
                            "5": ["09:00:00", "17:00:00"],
                            "6": null
                        }
                    }
                }
                //console.log('actual: ' + JSON.stringify(actual))
                assert.deepEqual(actual, expected)
                done()

            }).catch(function (e) {
                done(e)
            })
    })

    it('returns the previous business day', function (done) {

        var date = '23-07-2018' //Monday
        var format = 'DD-MM-YYYY'

        request(server)
            .get('/last-working-day?date=' + date + '&format=' + format)
            .expect(200)
            .then(function (res) {

                assert(res)
                assert(res.text)

                var actual = JSON.parse(res.text)
                assert(actual)

                var expected = {
                    "date": "20-07-2018",
                    "params": {
                        "date": "2018-07-23T07:00:00.000Z",
                        "format": "DD-MM-YYYY",
                        "units": "days",
                        "outputFormat": "DD-MM-YYYY",
                        "workinghours": {
                            "0": null,
                            "1": ["09:00:00", "17:00:00"],
                            "2": ["09:00:00", "17:00:00"],
                            "3": ["09:00:00", "17:00:00"],
                            "4": ["09:00:00", "17:00:00"],
                            "5": ["09:00:00", "17:00:00"],
                            "6": null
                        }
                    }
                }
                //console.log('actual: ' + JSON.stringify(actual))
                assert.deepEqual(actual, expected)
                done()

            }).catch(function (e) {
                done(e)
            })
    })

    it('returns the end of the previous business day', function (done) {

        var date = '22-07-2018 13:00' //Sunday
        var format = 'DD-MM-YYYY HH:mm'

        request(server)
            .get('/last-working-time?date=' + date + '&format=' + format)
            .expect(200)
            .then(function (res) {

                assert(res)
                assert(res.text)

                var actual = JSON.parse(res.text)
                assert(actual)

                var expected = {
                    "date": "20-07-2018 17:00",
                    "params": {
                        "date": "2018-07-22T20:00:00.000Z",
                        "format": "DD-MM-YYYY HH:mm",
                        "units": "days",
                        "outputFormat": "DD-MM-YYYY HH:mm",
                        "workinghours": {
                            "0": null,
                            "1": ["09:00:00", "17:00:00"],
                            "2": ["09:00:00", "17:00:00"],
                            "3": ["09:00:00", "17:00:00"],
                            "4": ["09:00:00", "17:00:00"],
                            "5": ["09:00:00", "17:00:00"],
                            "6": null
                        }
                    }
                }
                //console.log('actual: ' + JSON.stringify(actual))
                assert.deepEqual(actual, expected)
                done()

            }).catch(function (e) {
                done(e)
            })
    })

    it('returns the start of the next business day', function (done) {

        var date = '22-07-2018 13:00' //Sunday
        var format = 'DD-MM-YYYY HH:mm'

        request(server)
            .get('/next-working-time?date=' + date + '&format=' + format)
            .expect(200)
            .then(function (res) {

                assert(res)
                assert(res.text)

                var actual = JSON.parse(res.text)
                assert(actual)

                var expected = {
                    "date": "23-07-2018 09:00",
                    "params": {
                        "date": "2018-07-22T20:00:00.000Z",
                        "format": "DD-MM-YYYY HH:mm",
                        "units": "days",
                        "outputFormat": "DD-MM-YYYY HH:mm",
                        "workinghours": {
                            "0": null,
                            "1": ["09:00:00", "17:00:00"],
                            "2": ["09:00:00", "17:00:00"],
                            "3": ["09:00:00", "17:00:00"],
                            "4": ["09:00:00", "17:00:00"],
                            "5": ["09:00:00", "17:00:00"],
                            "6": null
                        }
                    }
                }
                //console.log('actual: ' + JSON.stringify(actual))
                assert.deepEqual(actual, expected)
                done()

            }).catch(function (e) {
                done(e)
            })
    })

    it('returns a date in a different format than it received it', function (done) {

        var date = '20-07-2018' //Friday
        var format = 'DD-MM-YYYY'
        var outputFormat = 'dddd, MMMM Do YYYY, h:mm a'

        request(server)
            .get('/add-working-time?date=' + date + '&format=' + format + '&amount=1&outputFormat=' + outputFormat)
            .expect(200)
            .then(function (res) {

                assert(res)
                assert(res.text)

                var actual = JSON.parse(res.text)
                assert(actual)

                var expected = {
                    "date": "Monday, July 23rd 2018, 12:00 am",
                    "params": {
                        "date": "2018-07-20T07:00:00.000Z",
                        "format": "DD-MM-YYYY",
                        "amount": 1,
                        "units": "days",
                        "outputFormat": "dddd, MMMM Do YYYY, h:mm a",
                        "workinghours": {
                            "0": null,
                            "1": ["09:00:00", "17:00:00"],
                            "2": ["09:00:00", "17:00:00"],
                            "3": ["09:00:00", "17:00:00"],
                            "4": ["09:00:00", "17:00:00"],
                            "5": ["09:00:00", "17:00:00"],
                            "6": null
                        }
                    }
                }
                //console.log('actual: ' + JSON.stringify(actual))
                assert.deepEqual(actual, expected)
                done()

            }).catch(function (e) {
                done(e)
            })
    })

    it('works with weekends as expected', function (done) {

        var date = '2018-07-20 19:41:17.000-07:00' //Friday at 7:41pm PST
        var format = 'YYYY-MM-DD HH:mm:ss.SSSZ'

        request(server)
            .get('/add-working-time?date=' + date + '&format=' + format + '&amount=1')
            .expect(200)
            .then(function (res) {

                assert(res)
                assert(res.text)

                var actual = JSON.parse(res.text)
                assert(actual)

                var expected = {
                    "date": "2018-07-23 19:41:17.000-07:00",
                    "params": {
                        "date": "2018-07-21T02:41:17.000Z",
                        "format": "YYYY-MM-DD HH:mm:ss.SSSZ",
                        "amount": 1,
                        "units": "days",
                        "outputFormat": "YYYY-MM-DD HH:mm:ss.SSSZ",
                        "workinghours": {
                            "0": null,
                            "1": ["09:00:00", "17:00:00"],
                            "2": ["09:00:00", "17:00:00"],
                            "3": ["09:00:00", "17:00:00"],
                            "4": ["09:00:00", "17:00:00"],
                            "5": ["09:00:00", "17:00:00"],
                            "6": null
                        }
                    }
                }
                //console.log('actual: ' + JSON.stringify(actual))
                assert.deepEqual(actual, expected)
                done()

            }).catch(function (e) {
                done(e)
            })
    })

    it('returns the difference between two dates', function (done) {

        var date = '24-08-2018' //Friday
        var toDate = '26-08-2018'
        var format = 'DD-MM-YYYY'

        request(server)
            .get('/working-diff?date=' + date + '&format=' + format + '&toDate=' + toDate + '&units=hours')
            .expect(200)
            .then(function (res) {

                assert(res)
                assert(res.text)

                var actual = JSON.parse(res.text)
                assert(actual)

                var expected = {
                    "diff": -8,
                    "params": {
                        "date": "2018-08-24T07:00:00.000Z",
                        "format": "DD-MM-YYYY",
                        "outputFormat": "DD-MM-YYYY",
                        "units": "hours",
                        "toDate": "2018-08-26T07:00:00.000Z",
                        "workinghours": {
                            "0": null,
                            "1": ["09:00:00", "17:00:00"],
                            "2": ["09:00:00", "17:00:00"],
                            "3": ["09:00:00", "17:00:00"],
                            "4": ["09:00:00", "17:00:00"],
                            "5": ["09:00:00", "17:00:00"],
                            "6": null
                        }
                    }
                }
                //console.log('actual: ' + JSON.stringify(actual))
                assert.deepEqual(actual, expected)
                done()

            }).catch(function (e) {
                done(e)
            })
    })

    it('fails when calling a function that does not exist', function (done) {

        request(server)
            .get('/not-a-function')
            .expect(500)
            .then(function (response) {
                done()
            })
            .catch(function (e) {
                done(e)
            })
    })

    it('supports holidays', function (done) {

        var date = '10-18-2018'
        var format = 'MM-DD-YYYY'
        var holidays = ['*-10-18', '*-10-18']

        request(server)
            .get('/is-working-day?date=' + date + '&format=' + format + '&holidays=' + holidays.join(','))
            .expect(200)
            .then(function (res) {

                assert(res)
                assert(res.text)

                var actual = JSON.parse(res.text)
                assert(actual)
                
                var expected = {
                    "isWorkingDay": false,
                    "params": {
                        "date": "2018-10-18T07:00:00.000Z",
                        "format": "MM-DD-YYYY",
                        "units": "days",
                        "outputFormat": "MM-DD-YYYY",
                        "holidays": ["*-10-18","*-10-18"],
                        "workinghours": {
                            "0": null,
                            "1": ["09:00:00", "17:00:00"],
                            "2": ["09:00:00", "17:00:00"],
                            "3": ["09:00:00", "17:00:00"],
                            "4": ["09:00:00", "17:00:00"],
                            "5": ["09:00:00", "17:00:00"],
                            "6": null
                        }
                    }
                }
                //console.log('actual: ' + JSON.stringify(actual))
                assert.deepEqual(actual, expected)
                done()

            }).catch(function (e) {
                done(e)
            })
    })
})