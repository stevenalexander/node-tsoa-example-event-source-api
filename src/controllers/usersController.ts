import { Get, Post, Route, Body, SuccessResponse, Controller } from 'tsoa'
import { inject, provideSingleton } from '../ioc'
import { UserCreateCommand } from '../services/command/userCreateCommand'
import { UserUpdateStatusCommand } from '../services/command/userUpdateStatusCommand'
import { UserGetAllQuery } from '../services/query/userGetAllQuery'
import { UserGetQuery } from '../services/query/userGetQuery'
import { User, UserCreationRequest, UserChangeOfStatusRequest } from 'tsoa-example-models'

// Needed to make controller injectable for extended Singleton class
import { decorate, injectable } from 'inversify'
decorate(injectable(), Controller )

@Route('Users')
@provideSingleton(UsersController)
export class UsersController extends Controller {
  constructor(
    @inject(UserCreateCommand) private userCreateCommand: UserCreateCommand,
    @inject(UserUpdateStatusCommand) private userUpdateStatusCommand: UserUpdateStatusCommand,
    @inject(UserGetAllQuery) private userGetAllQuery: UserGetAllQuery,
    @inject(UserGetQuery) private userGetQuery: UserGetQuery) {
    super()
  }

  @Get()
  public async getAll(): Promise<User[]> {
    let users = await this.userGetAllQuery.execute()
    return users
  }

  @Get('{id}')
  public async getUser(id: number): Promise<User> {
    return await this.userGetQuery.execute(id)
  }

  @SuccessResponse('201', 'Created') // Custom success response
  @Post()
  public async createUser(@Body() requestBody: UserCreationRequest): Promise<void> {
    await this.userCreateCommand.execute(requestBody)
    this.setStatus(201) // set return status 201
    return Promise.resolve()
  }

  @Post('{id}/ChangeOfStatus')
  public async changeOfStatus(@Body() requestBody: UserChangeOfStatusRequest): Promise<void> {
    await this.userUpdateStatusCommand.execute(requestBody)
    this.setStatus(201) // set return status 201
    return Promise.resolve()
  }
}
