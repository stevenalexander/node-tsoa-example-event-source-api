
exports.up = function (knex, Promise) {
  return knex.schema.createTable('UserEvent', function (table) {
    table.increments('userEventId').unique()
    table.string('eventType')
    table.jsonb('eventData')
    table.integer('userId')
    table.timestamp('created').defaultTo(knex.fn.now())
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('UserEvent')
}
