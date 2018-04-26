import * as Knex from 'knex'
import {iocContainer, provideSingleton} from '../../ioc'
import {UserEvent} from '../userEvent'
import {UserChangeOfStatusRequest} from 'tsoa-example-models'

@provideSingleton(UserUpdateStatusCommand)
export class UserUpdateStatusCommand {
  public async execute(userChangeOfStatusRequest: UserChangeOfStatusRequest): Promise<UserEvent> {
    let knex = iocContainer.get<Knex>('knex')
    let event = UserEvent.updateStatus(userChangeOfStatusRequest)
    return knex('UserEvent').insert(event).then(() => { return event })
  }
}
