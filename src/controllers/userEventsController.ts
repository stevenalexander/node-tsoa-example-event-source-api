import { Get, Route, Controller } from 'tsoa'
import { inject, provideSingleton } from '../ioc'
import { UserEventsGetAllQuery } from '../services/query/userEventsGetAllQuery'
import { UserEvent } from '../services/userEvent'

@Route('UserEvents')
@provideSingleton(UserEventsController)
export class UserEventsController extends Controller {
  constructor(@inject(UserEventsGetAllQuery) private userEventsGetAllQuery: UserEventsGetAllQuery) {
    super()
  }

  @Get()
  public async getAll(): Promise<UserEvent[]> {
    let userEvents = await this.userEventsGetAllQuery.execute()
    return userEvents
  }
}
