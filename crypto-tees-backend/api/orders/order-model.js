const db = require("../../database/db");

async function createOrder(order) {
    const [newOrder] = await db("orders").insert(order, "*")
    return newOrder
}

function getOrders() {
    return db("orders").select("*")
}

function openOrders() {
    return db("orders").select("*").where("is_processed", false)
}

// reserch how to filter orders by 30days and 1year

function updateOrder(info, id) {
    return db("orders").update(info).where(id)
}

module.exports = {
    createOrder,
    getOrders,
    openOrders,
    updateOrder
}
