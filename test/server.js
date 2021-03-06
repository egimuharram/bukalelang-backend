var chai = require('chai')
var chaiHttp = require('chai-http')
require('dotenv').config()
let app = require('../app')

var should = chai.should()
chai.use(chaiHttp)

let serverHost = app

describe('Server healthy test', () => {
  describe('Express - httpServer running', () => {
    it('Should be return {status: "up"} when try to access /ping', (done) => {
      chai.request(serverHost).get('/ping').end((err, res) => {
        if (err) {
          done(err)
        } else {
          res.body.status.should.to.equal('up')
          done()
        }
      });
    })
  })
  describe('Database connection', () => {

    it('Should be return {status : "connected"} when trying to access /test/database', (done) => {
      chai.request(serverHost).get('/test/database').end((err, res) => {
        if (err) {
          done(err)
        } else {
          res.body.status.should.to.equal('connected')
          done()
        }
      });
    })
  })
})
