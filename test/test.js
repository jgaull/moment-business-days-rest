
var request = require('supertest')
var assert = require('assert')

describe('business-days', function () {

    this.timeout(10000)

    it('adds 3 business days', function (done) {

        var server = require('../index').server

        request(server)
            .get('/business-add')
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