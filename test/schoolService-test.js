const {assert} = require('chai')
const should = require('chai').should()
const schoolService = require('../services/schoolService')
const { connect, initSchema } = require('../database/init')
  ; (async () => {
    await connect()
    initSchema()

  })()
describe('#schoolService.js', () => {
  describe('#schools()', () => {
    it('schools() should be a Array', async() => {
      let schools = await schoolService.schools(1,20)
      assert.typeOf(schools, 'Array')
    })
    it('schools() length should be 20 ', async () => {
      let schools = await schoolService.schools(1,20)
      assert.lengthOf(schools, 20)
    })
  })
  describe('#school()', () => {
    it('school() should be a Object', async () => {
      let school = await schoolService.schoolSpecials(554)
      assert.typeOf(school, 'Object')
    })
    it('schools() length should be 20 ', async () => {
      let school = await schoolService.school(554)
      school.should.have.property('school_id')
    })
  })
});