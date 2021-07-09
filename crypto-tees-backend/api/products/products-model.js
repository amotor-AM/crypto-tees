const db = require("../../database/db")

function getProducts() {
    return db.select("*").from("products").join("stock", "products._id", "stock.product")
}

function getProductById(id) {
    return db.select("*").from("products").join("stock", "products._id", "stock.product").where("_id", id)
}

async function addProduct(product) {
    const existingItem = await getProduct(product.name)
    if(existingItem) {
        return {error: "Item already exists with the same name.", product: existingItem}
    }
}

function updateProduct(id, field, changes) {
    return db("products").where("_id", id).update(field, changes)
}

function updateStock(id, size, newCount) {
    return db("stock").where("product", id).update(size, newCount)
}

function deleteProduct(id) {
    return db("products").where("_id", id).del()
}

module.exports = {
    getProducts,
    getProductById,
    addProduct,
    updateProduct,
    updateStock,
    deleteProduct
}