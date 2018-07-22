
var request = require('supertest')
var assert = require('assert')
var equal = require('deep-equal')

describe('business-days', function () {

    this.timeout(2000)

    var server = require('../index').server

    it('adds 1 business day', function (done) {

        var date = '20-07-2018' //Friday
        var format = 'DD-MM-YYYY'

        request(server)
            .get('/business-add?date=' + date + '&format=' + format + '&amount=1')
            .expect(200)
            .then(function (res) {

                assert(res)
                assert(res.text)

                var actual = JSON.parse(res.text)
                assert(actual)

                var expected = {
                    date: '23-07-2018', //Monday
                    params: {
                        date: date,
                        format: format,
                        amount: 1,
                        outputFormat: format
                    }
                }
                
                assert(equal(actual, expected))
                //console.log('actual: ' + JSON.stringify(actual))
                done()

            }).catch(function (e) {
                done(e)
            })
    })

    it('subtracts 1 business day', function (done) {

        var date = '23-07-2018' //Monday
        var format = 'DD-MM-YYYY'

        request(server)
            .get('/business-subtract?date=' + date + '&format=' + format + '&amount=1')
            .expect(200)
            .then(function (res) {

                assert(res)
                assert(res.text)

                var actual = JSON.parse(res.text)
                assert(actual)

                var expected = {
                    date: '20-07-2018', //Friday
                    params: {
                        date: date,
                        format: format,
                        amount: 1,
                        outputFormat: format
                    }
                }

                assert(equal(actual, expected))
                //console.log('actual: ' + JSON.stringify(actual))
                done()

            }).catch(function (e) {
                done(e)
            })
    })

    it('tests if it is a business day', function (done) {

        var date = '23-07-2018' //Monday
        var format = 'DD-MM-YYYY'

        request(server)
            .get('/is-business-day?date=' + date + '&format=' + format)
            .expect(200)
            .then(function (res) {

                assert(res)
                assert(res.text)

                var actual = JSON.parse(res.text)
                assert(actual)

                var expected = {
                    isBusinessDay: true,
                    params: {
                        date: date,
                        format: format,
                        outputFormat: format
                    }
                }

                assert(equal(actual, expected))
                //console.log('actual: ' + JSON.stringify(actual))
                done()

            }).catch(function (e) {
                done(e)
            })
    })

    it('returns the next business day', function (done) {

        var date = '20-07-2018' //Friday
        var format = 'DD-MM-YYYY'

        request(server)
            .get('/next-business-day?date=' + date + '&format=' + format)
            .expect(200)
            .then(function (res) {

                assert(res)
                assert(res.text)

                var actual = JSON.parse(res.text)
                assert(actual)

                var expected = {
                    date: '23-07-2018', //Monday
                    params: {
                        date: date,
                        format: format,
                        outputFormat: format
                    }
                }

                assert(equal(actual, expected))
                //console.log('actual: ' + JSON.stringify(actual))
                done()

            }).catch(function (e) {
                done(e)
            })
    })

    it('returns the previous business day', function (done) {

        var date = '23-07-2018' //Monday
        var format = 'DD-MM-YYYY'

        request(server)
            .get('/prev-business-day?date=' + date + '&format=' + format)
            .expect(200)
            .then(function (res) {

                assert(res)
                assert(res.text)

                var actual = JSON.parse(res.text)
                assert(actual)

                var expected = {
                    date: '20-07-2018', //Friday
                    params: {
                        date: date,
                        format: format,
                        outputFormat: format
                    }
                }

                assert(equal(actual, expected))
                //console.log('actual: ' + JSON.stringify(actual))
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
            .get('/business-add?date=' + date + '&format=' + format + '&amount=1&outputFormat=' + outputFormat)
            .expect(200)
            .then(function (res) {

                assert(res)
                assert(res.text)

                var actual = JSON.parse(res.text)
                assert(actual)

                var expected = {
                    date: 'Monday, July 23rd 2018, 12:00 am',
                    params: {
                        date: date,
                        format: format,
                        amount: 1,
                        outputFormat: outputFormat
                    }
                }

                assert(equal(actual, expected))
                //console.log('actual: ' + JSON.stringify(actual))
                done()

            }).catch(function (e) {
                done(e)
            })
    })
})