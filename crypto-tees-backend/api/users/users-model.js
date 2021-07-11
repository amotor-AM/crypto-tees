const db = require("../../database/db")

async function signup(user) {
        const [newUser] = await db("users").insert(user, "*")
        return newUser
}

/* This is a more dynamic way of searching for users. Because I am returning
users based on an arbitrary filter I can re-use this same query to filter
by role, email, and logged_in*/
function findUser(filter) {
    return db("users").select("*").where(filter)
}

function returnAllUsers() {
    return db("users").select("*")
}

function getSellersAndProducts(filter) {
    return db.select("users.id", "users.name", "users.logged_in", "users.email", "products._id", "products.name", "products.main_image", "products.price", "stock.*")
    .from("users").join("products", "users.id", "products.creator").join("stock", "products._id", "stock.product").where(filter)
}

function setUserAsLoggedIn(id) {
    return db("users").update("logged_in", true).where("id", id)
}

function setUserAsLoggedOut(id) {
    return db("users").update("logged_in", false).where("id", id)
}

function removeUser(email){
    return db("users").where(email).del()
}

function changeUserRole(email, role) {
    return db("users").update(role).where(email)
    
}

module.exports = {
    signup,
    findUser,
    returnAllUsers,
    getSellersAndProducts,
    setUserAsLoggedIn,
    setUserAsLoggedOut,
    removeUser,
    changeUserRole
}