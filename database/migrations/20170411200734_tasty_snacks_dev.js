// id, name, image_url, review_description, rating
exports.up = (knex) => {
  return knex.schema.createTable('snacks', table => {
    table.increments()
    table.string('name')
    table.string('image_url')
    table.string('review_description')
    table.integer('rating')
  })
}

exports.down = (knex) => {
  return knex.schema.dropTable('snacks')
}
