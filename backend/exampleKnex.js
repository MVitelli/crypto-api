const db = require('./db')

const create = db.schema.createTable('user', (table) => {
    table.increments('id')
    table.string('name')
    table.integer('age')
})

create.then(res => console.log('success', res))

module.export = create