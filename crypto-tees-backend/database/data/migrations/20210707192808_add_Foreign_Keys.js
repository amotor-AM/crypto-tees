
exports.up = function(knex) {
    return knex.schema.table("stock", tbl => {
        tbl.foreign("product").references("_id").inTable("products")
    })
    .table("products", tbl => {
        tbl.foreign("creator").references("id").inTable("users")
    })
    .table("orders", tbl => {
        tbl.foreign("user").references("id").inTable("users")
    })
};

exports.down = function(knex) {
    return knex.schema.table("orders", tbl => {
        tbl.dropForeign("user")
    })
    .table("products", tbl => {
        tbl.dropForeign("creator")
    })
    .table("stock", tbl => {
        tbl.dropForeign("product")
    })
};
