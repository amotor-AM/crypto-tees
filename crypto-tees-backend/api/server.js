const express = require("express")
const cors = require("cors")
const helmet = require("helmet")
const cookieParser = require("cookie-parser")
// const restricted = "./middleware/restricted"
// const data = require("./data.js")
const productsRouter = require("../api/products/products-router")

const server = express()
server.use(helmet())
server.use(cors())
server.use(express.json())
server.use(cookieParser())

// fetch data from PG database
server.use("/api/products", productsRouter)

// // fetch all products
// server.get("/api/products", (req, res) => {
//     res.send(data.products) // update products endpoint
// })

// //fetch product by id
// server.get("/api/products/:id", (req, res) => {
//     const product = data.products.find((x) => x._id === req.params.id)
//     if(product){
//         res.send(product)
//     } else {
//         res.status(404).send({message: "Product Does Not Exist."})
//     }
// })

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