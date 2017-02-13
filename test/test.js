/* eslint-env mocha */

const chai = require('chai')
const expect = chai.expect
const settingsManager = require('../main-scripts/settings')
const db = require('../main-scripts/database')

describe('Settings Manager', function () {
  let settingsDump

  before(function (done) {
    db.loadDatabase((err) => {
      if (err) done(err)
      else done()
    })
  })

  describe('-> init()', function () {
    it('should init without error', function (done) {
      settingsManager.init((err, result) => {
        if (err) done(err)
        else {
          settingsDump = result
          done()
        }
      })
    })
  })

  describe('-> settings-types', function () {
    describe('-->_id', function () {
      it('should be 1', function () {
        expect(settingsDump._id).to.equal(1)
      })
    })
    describe('--> startInTray', function () {
      it('should be boolean', function () {
        expect(settingsDump.startInTray).to.be.a('boolean')
      })
    })
  })
})
