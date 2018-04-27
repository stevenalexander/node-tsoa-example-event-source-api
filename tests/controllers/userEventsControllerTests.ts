import 'mocha'
import { assert } from 'chai'
import '../../src/ioc'
import { mock, instance, when, verify } from 'ts-mockito'
import { UserCreationRequest } from 'tsoa-example-models'
import { UserEventsGetAllQuery } from '../../src/services/query/userEventsGetAllQuery'
import { UserEventsController } from '../../src/controllers/UserEventsController'
import { UserEvent } from '../../src/services/userEvent'

describe('UserEventsController', () => {
  let userEventsController: UserEventsController

  let userEventsGetAllQuery: UserEventsGetAllQuery

  let userCreationRequest: UserCreationRequest = {
    name: 'Name',
    email: 'Email',
    phoneNumbers: []
  }
  let userEvent1 = UserEvent.create(userCreationRequest)

  beforeEach(() => {
    userEventsGetAllQuery = mock(UserEventsGetAllQuery)

    let userEventsGetAllQueryInstance = instance(userEventsGetAllQuery)

    userEventsController = new UserEventsController(userEventsGetAllQueryInstance)
  })

  describe('getAll', () => {
    it('should call service', async () => {
      when(userEventsGetAllQuery.execute()).thenResolve([userEvent1])

      let userEvents = await userEventsController.getAll()

      verify(userEventsGetAllQuery.execute()).called()
      assert.equal(userEvent1.userEventId, userEvents[0].userEventId)
    })
  })

})
