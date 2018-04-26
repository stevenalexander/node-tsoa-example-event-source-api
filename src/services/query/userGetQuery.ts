import * as Knex from 'knex'
import {iocContainer, provideSingleton} from '../../ioc'
import {UserEvent} from '../userEvent'
import {User} from 'tsoa-example-models'

@provideSingleton(UserGetQuery)
export class UserGetQuery { // TODO switch to materialised view
  public async execute(userId: number): Promise<User> {
    let knex = iocContainer.get<Knex>('knex')

    return knex('UserEvent').where('userId', userId).select()
      .then(result => { return result.map(r => UserEvent.mapFromResult(r)) })
      .then(userEvents => {
        return UserEvent.userFromUserEvents(userEvents)
      })
  }
}
