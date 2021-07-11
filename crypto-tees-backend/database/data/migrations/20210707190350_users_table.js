
exports.up = function(knex) {
    return knex.schema.createTable("users", tbl => {
        tbl.increments("id") // I am aware this defaults to id but I want to be verbose
        tbl.string("name").notNullable()
        tbl.string("role").defaultTo("standard")
        tbl.string("password").notNullable()
        tbl.boolean("logged_in").defaultTo(false)
        tbl.string("size")
        tbl.string("email").notNullable()
    })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists("users")
};
