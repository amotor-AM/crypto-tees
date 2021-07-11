const db = require("../../database/db")


function getAllUsers(){
    return db("users")
    .select("*")
}

function getUser(user){
    return db("users").select("*").where(user)
}

function getUserById(id){
    return db(users).select("*").where({id}).first()
}

async function addUser(userInfo){
    const [newUser] = await db("users").insert(user, "*")
    return newUser
}



module.exports = {
    getAllUsers,
    getUser,
    getUserById, 
    addUser,
    removeUser
}