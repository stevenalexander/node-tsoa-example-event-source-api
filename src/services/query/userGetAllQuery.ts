import * as Knex from 'knex'
import {iocContainer, provideSingleton} from '../../ioc'
import {UserEvent} from '../userEvent'
import {User} from 'tsoa-example-models'

@provideSingleton(UserGetAllQuery)
export class UserGetAllQuery { // TODO switch to materialised view
  public async execute(): Promise<User[]> {
    let knex = iocContainer.get<Knex>('knex')

    return knex('UserEvent').select()
      .then(result => { return result.map(r => UserEvent.mapFromResult(r)) })
      .then(events => {
        return events.reduce(function(eventsByUserId, e) {
            (eventsByUserId[e['userId']] = eventsByUserId[e['userId']] || []).push(e)
            return eventsByUserId
          }, {})
      })
      .then(eventsByUserId => {
        let users: User[] = []
        if (eventsByUserId && Object.keys(eventsByUserId)) {
          return Object.keys(eventsByUserId).map(key => UserEvent.userFromUserEvents(eventsByUserId[key]))
        }
        return users
      })
  }
}
