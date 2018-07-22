
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
                    date: '23-07-2018' //Monday
                }
                
                assert.equal(actual.date, expected.date)
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
                    date: '20-07-2018' //Friday
                }

                assert.equal(actual.date, expected.date)
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
                    isBusinessDay: true
                }

                assert.equal(actual.date, expected.date)
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
                    date: '23-07-2018' //Monday
                }

                assert.equal(actual.date, expected.date)
                //console.log('actual: ' + JSON.stringify(actual))
                done()

            }).catch(function (e) {
                done(e)
            })
    })

    it('returns the previous business day', function (done) {

        request(server)
            .get('/prev-business-day')
            .expect(200)
            .then(function (res) {

                assert(res)
                assert(res.text)

                var data = JSON.parse(res.text)
                assert(data)
                //console.log('data: ' + JSON.stringify(data))
                done()

            }).catch(function (e) {
                done(e)
            })
    })
})