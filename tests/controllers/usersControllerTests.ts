import 'mocha'
import { assert } from 'chai'
import '../../src/ioc'
import { mock, instance, when, verify } from 'ts-mockito'
import { User, UserCreationRequest, UserChangeOfStatusRequest, UserStatus } from 'tsoa-example-models'
import { UserCreateCommand } from '../../src/services/command/userCreateCommand'
import { UserUpdateStatusCommand } from '../../src/services/command/userUpdateStatusCommand'
import { UserGetAllQuery } from '../../src/services/query/userGetAllQuery'
import { UserGetQuery } from '../../src/services/query/userGetQuery'
import { UsersController } from '../../src/controllers/usersController'
import { UserEvent } from '../../src/services/userEvent'

describe('UsersController', () => {
  let usersController: UsersController

  let userCreateCommand: UserCreateCommand
  let userUpdateStatusCommand: UserUpdateStatusCommand
  let userGetAllQuery: UserGetAllQuery
  let userGetQuery: UserGetQuery

  let user1: User = {
    id: 1234,
    email: 'string',
    name: 'Name',
    phoneNumbers: [],
    status: 'status'
  }

  beforeEach(() => {
    userCreateCommand = mock(UserCreateCommand)
    userUpdateStatusCommand = mock(UserUpdateStatusCommand)
    userGetAllQuery = mock(UserGetAllQuery)
    userGetQuery = mock(UserGetQuery)

    let userCreateCommandInstance = instance(userCreateCommand)
    let userUpdateStatusCommandInstance = instance(userUpdateStatusCommand)
    let userGetAllQueryInstance = instance(userGetAllQuery)
    let userGetQueryInstance = instance(userGetQuery)

    usersController = new UsersController(userCreateCommandInstance, userUpdateStatusCommandInstance, userGetAllQueryInstance, userGetQueryInstance)
  })

  describe('getAll', () => {
    it('should call service', async () => {
      when(userGetAllQuery.execute()).thenResolve([user1])

      let users = await usersController.getAll()

      verify(userGetAllQuery.execute()).called()
      assert.equal(1234, users[0].id)
    })
  })

  describe('getUser', () => {
    it('should call service', async () => {
      when(userGetQuery.execute(1)).thenReturn(Promise.resolve(user1))

      let user = await usersController.getUser(1)

      verify(userGetQuery.execute(1)).called()
      assert.equal(1234, user.id)
    })
  })

  describe('createUser', () => {
    it('should call service', async () => {
      let userCreationRequest: UserCreationRequest = {
        name: 'Name',
        email: 'Email',
        phoneNumbers: []
      }
      when(userCreateCommand.execute(userCreationRequest)).thenReturn(Promise.resolve(UserEvent.create(userCreationRequest)))

      await usersController.createUser(userCreationRequest)

      verify(userCreateCommand.execute(userCreationRequest)).called()
    })
  })

  describe('changeOfStatus', () => {
    it('should call service', async () => {
      let userChangeOfStatusRequest: UserChangeOfStatusRequest = {
        id: 1,
        status: UserStatus.Active
      }
      when(userUpdateStatusCommand.execute(userChangeOfStatusRequest)).thenReturn(Promise.resolve(UserEvent.updateStatus(userChangeOfStatusRequest)))

      await usersController.changeOfStatus(userChangeOfStatusRequest)

      verify(userUpdateStatusCommand.execute(userChangeOfStatusRequest)).called()
    })
  })

})
