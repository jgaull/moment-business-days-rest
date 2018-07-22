
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
                    date: '23-07-2018', //Monday
                    params: {
                        date: '2018-07-20T07:00:00.000Z',
                        format: format,
                        amount: 1,
                        outputFormat: format,
                        units: 'days'
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
                    date: '20-07-2018', //Friday
                    params: {
                        date: '2018-07-23T07:00:00.000Z',
                        format: format,
                        amount: 1,
                        outputFormat: format,
                        units: 'days'
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

        var date = '23-07-2018' //Monday
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
                    isBusinessDay: true,
                    params: {
                        date: '2018-07-23T07:00:00.000Z',
                        format: format,
                        outputFormat: format,
                        units: 'days'
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
                    date: '23-07-2018', //Monday
                    params: {
                        date: '2018-07-20T07:00:00.000Z',
                        format: format,
                        outputFormat: format,
                        units: 'days'
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
                    date: '20-07-2018', //Friday
                    params: {
                        date: '2018-07-23T07:00:00.000Z',
                        format: format,
                        outputFormat: format,
                        units: 'days'
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
                    date: 'Monday, July 23rd 2018, 12:00 am',
                    params: {
                        date: '2018-07-20T07:00:00.000Z',
                        format: format,
                        amount: 1,
                        outputFormat: outputFormat,
                        units: 'days'
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
                    date: '2018-07-23 19:41:17.000-07:00', //Monday at 7:41pm PST
                    params: {
                        date: '2018-07-21T02:41:17.000Z',
                        format: format,
                        amount: 1,
                        outputFormat: format,
                        units: 'days'
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