import * as Knex from 'knex'
import {iocContainer, provideSingleton} from '../../ioc'
import {UserEvent} from '../userEvent'

@provideSingleton(UserEventsGetAllQuery)
export class UserEventsGetAllQuery {
  public async execute(): Promise<UserEvent[]> {
    let knex = iocContainer.get<Knex>('knex')
    return knex('UserEvent').select()
  }
}
