
var request = require('supertest')
var assert = require('assert')
var equal = require('deep-equal')

describe('business-days', function () {

    this.timeout(10000)

    var server = require('../index').server

    it('adds 1 business day', function (done) {

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
                }
                
                assert.equal(actual.date, expected.date)
                //console.log('actual: ' + JSON.stringify(actual))
                done()

            }).catch(function (e) {
                done(e)
            })
    })

    it('subtracts 2 business days', function (done) {

        var server = require('../index').server

        request(server)
            .get('/business-subtract')
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

    it('tests if it is a business day', function (done) {

        var server = require('../index').server

        request(server)
            .get('/is-business-day')
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

    it('returns the next business day', function (done) {

        var server = require('../index').server

        request(server)
            .get('/next-business-day')
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

    it('returns the previous business day', function (done) {

        var server = require('../index').server

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