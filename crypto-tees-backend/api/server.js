import express from "express"
import cors from "cors"
import helmet from "helmet"
import cookieParser from "cookie-parser"
// import restricted from "./middleware/restricted"
import data from "./data.js"

const server = express()
server.use(helmet())
server.use(cors())
server.use(express.json())
server.use(cookieParser())

// fetch all products
server.get("/api/products", (req, res) => {
    res.send(data.products) // update products endpoint
})

//fetch product by id
server.get("/api/products/:id", (req, res) => {
    const product = data.products.find((x) => x._id === req.params.id)
    if(product){
        res.send(product)
    } else {
        res.status(404).send({message: "Product Does Not Exist."})
    }
})

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

export default server