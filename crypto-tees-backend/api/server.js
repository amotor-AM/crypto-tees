const express = require("express")
const cors = require("cors")
const helmet = require("helmet")
const dotenv = require("dotenv")
const cookieParser = require("cookie-parser")
// const restricted = "./middleware/restricted"
// const data = require("./data.js")
const productsRouter = require("../api/products/products-router")
const usersRouter = require("../api/users/users-router")

dotenv.config()

const server = express()
server.use(helmet())
server.use(cors())
server.use(express.json())
server.use(express.urlencoded({extended: true}))
server.use(cookieParser())

// fetch data from PG database
server.use("/api/products", productsRouter)
server.use("/api/users", usersRouter)

// error catcher
server.use((err, req, res, next) => {
    res.status(500).json({
        message: err.message,
        stack: err.stack
    })
})

// respond when server running
server.get("/", (req, res) => {
    res.json({api: "running"})
})

module.exports = server