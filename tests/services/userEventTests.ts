import 'mocha'
import { assert } from 'chai'
import { UserCreationRequest, UserChangeOfStatusRequest, UserStatus } from 'tsoa-example-models'
import { UserEvent } from '../../src/services/userEvent'

describe('UserEvent', () => {
  describe('mapFromResult', () => {
    it('should reconstruct event from database result', async () => {
      let result = {
        'eventType': 'CREATE',
        'eventData': '{"userId":"1234","name":"Test1","email":"test1@test.com","phonenumbers":["123456"]}',
        'userId': 1234,
        'created': new Date('2001-09-27 23:00:00')
      }

      let event = UserEvent.mapFromResult(result)

      assert.equal(1234, event.userId)
      assert.equal('CREATE', event.eventType)
    })
  })

  describe('create', () => {
    it('should make a new create user event', async () => {
      let userCreationRequest: UserCreationRequest = {
        name: 'Name',
        email: 'Email',
        phoneNumbers: []
      }

      let event = UserEvent.create(userCreationRequest)

      assert.isNotNull(event.userId)
      assert.equal('CREATE', event.eventType)
      assert.isNotNull(event.created) // TODO check date is now

      let eventData = JSON.parse(event.eventData)
      assert.equal(event.userId, eventData['userId'])
      assert.equal('Name', eventData['name'])
      assert.equal('Email', eventData['email'])
    })
  })

  describe('updateStatus', () => {
    it('should make a new update status user event', async () => {
      let userChangeOfStatusRequest: UserChangeOfStatusRequest = {
        id: 1234,
        status: UserStatus.Active
      }

      let event = UserEvent.updateStatus(userChangeOfStatusRequest)

      assert.isNotNull(event.userId)
      assert.equal('UPDATE-STATUS', event.eventType)
      assert.isNotNull(event.created) // TODO check date is now

      let eventData = JSON.parse(event.eventData)
      assert.equal(event.userId, eventData['userId'])
      assert.equal(UserStatus.Active, eventData['status'])
    })
  })
})
