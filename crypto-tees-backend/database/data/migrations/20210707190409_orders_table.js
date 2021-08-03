
exports.up = function(knex) {
    return knex.schema.createTable("orders", tbl => {
        tbl.increments("id") // I am aware this defaults to id but I want to be verbose
        tbl.timestamp('created_at').defaultTo(knex.fn.now())
        tbl.integer("user").notNullable()
        tbl.jsonb("items").notNullable()
        tbl.float("price", 2, 2).notNullable()
        tbl.float("shipping", 2, 2).notNullable()
        tbl.float("tax", 2, 2).notNullable()
        tbl.float("total", 2, 2).notNullable()
        tbl.string("payment_method").notNullable()
        tbl.boolean("is_paid").notNullable().defaultTo(false)
        tbl.boolean("is_processed").notNullable().defaultTo(false)
        tbl.jsonb("shipping_address").notNullable()
        tbl.string("tracking_info")
        tbl.datetime("delivered", options={useTz: true})
    })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists("orders")
};
