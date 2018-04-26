import * as Knex from 'knex'
import {iocContainer, provideSingleton} from '../../ioc'
import {UserEvent} from '../userEvent'
import {UserCreationRequest} from 'tsoa-example-models'

@provideSingleton(UserCreateCommand)
export class UserCreateCommand {
  public async execute(userCreationRequest: UserCreationRequest): Promise<UserEvent> {
    let knex = iocContainer.get<Knex>('knex')
    let event = UserEvent.create(userCreationRequest)
    return knex('UserEvent').insert(event).then(() => { return event })
  }
}
