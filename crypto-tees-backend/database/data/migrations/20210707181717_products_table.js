
exports.up = function(knex) {
  return knex.schema.createTable("products", tbl => {
      tbl.increments("_id")
      tbl.text("name").notNullable()
      tbl.text("description").notNullable()
      tbl.text("main_image").notNullable()
      tbl.jsonb("alt_images")
      tbl.float("price", 2, 2).notNullable()
      tbl.integer("creator").notNullable()
      tbl.float("rating", 2, 2).notNullable()
      tbl.integer("numReviews").notNullable()
  })
  .createTable("stock", tbl => {
      tbl.increments("id") // I am aware this defaults to id but I want to be verbose
      tbl.integer("product").notNullable()
      tbl.integer("small")
      tbl.integer("medium")
      tbl.integer("large")
      tbl.integer("Xlarge")
  })
};

exports.down = function(knex) {
   return knex.schema.dropTableIfExists("stock").dropTableIfExists("products")
};
