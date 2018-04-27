import 'reflect-metadata'
import {Container, inject, interfaces} from 'inversify'
import {autoProvide, makeFluentProvideDecorator, makeProvideDecorator} from 'inversify-binding-decorators'
import * as Knex from 'knex'
import {development} from './knexfile'

const iocContainer = new Container()

let knex: Knex = Knex(development)
iocContainer.bind<Knex>('knex').toConstantValue(knex)

// Needed to make controller injectable for extended Singleton class
import { Controller } from 'tsoa'
import { decorate, injectable } from 'inversify'
decorate(injectable(), Controller )

const provide = makeProvideDecorator(iocContainer)
const fluentProvider = makeFluentProvideDecorator(iocContainer)

const provideNamed = (
  identifier: string | symbol | interfaces.Newable<any> | interfaces.Abstract<any>,
  name: string,
) => {
    return fluentProvider(identifier)
      .whenTargetNamed(name)
      .done()
}

const provideSingleton = (
  identifier: string | symbol | interfaces.Newable<any> | interfaces.Abstract<any>,
) => {
    return fluentProvider(identifier)
      .inSingletonScope()
      .done()
}

export { iocContainer, autoProvide, provide, provideSingleton, provideNamed, inject }
