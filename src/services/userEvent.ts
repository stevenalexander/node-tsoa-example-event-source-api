import {User, UserCreationRequest, UserChangeOfStatusRequest} from 'tsoa-example-models'

enum UserEventType {
  Create = 'CREATE',
  UpdateStatus = 'UPDATE-STATUS'
}

export class UserEvent {
  userEventId?: number
  eventType: UserEventType
  eventData: any
  userId: number
  created: Date

  private constructor(eventType: UserEventType, eventData: any, userId: number, created?: Date) {
    this.eventType = eventType
    this.eventData = eventData
    this.userId = userId
    this.created = created || new Date
  }

  static mapFromResult(result: any): UserEvent {
    let event = new UserEvent(result['eventType'], result['eventData'], result['userId'], result['created'])
    event.userEventId = result['userEventId']
    return event
  }

  static create(userCreationRequest: UserCreationRequest): UserEvent {
    let userId = this.generateUserId()
    let eventData = {
      userId: userId,
      name: userCreationRequest.name,
      email: userCreationRequest.email,
      phoneNumbers: userCreationRequest.phoneNumbers
    }
    let event = new UserEvent(UserEventType.Create, JSON.stringify(eventData), userId)
    return event
  }

  static updateStatus(userChangeOfStatusRequest: UserChangeOfStatusRequest): UserEvent {
    let eventData = {
      userId: userChangeOfStatusRequest.id,
      status: userChangeOfStatusRequest.status
    }
    let event = new UserEvent(UserEventType.UpdateStatus, JSON.stringify(eventData), userChangeOfStatusRequest.id)
    return event
  }

  static userFromUserEvents(userEvents: UserEvent[]): User { // TODO doesn't belong here and should be replaced by materialised view
    let user: User = null
    userEvents.map(userEvent => {
      let eventData = userEvent.eventData
      switch (userEvent.eventType) {
        case UserEventType.Create:
          user = {
            id: eventData.userId,
            name: eventData.name,
            email: eventData.email,
            phoneNumbers: eventData.phoneNumbers
          }
          break
        case UserEventType.UpdateStatus:
          if (user) {
            user.status = eventData.status
          }
          break
        default:
          break
      }
    })
    return user
  }

  private static generateUserId(): number {
    return Math.floor( Math.random() * 2147483647 )
  }
}
