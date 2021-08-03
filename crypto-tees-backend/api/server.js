const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const dotenv = require("dotenv").config();
const cookieParser = require("cookie-parser");
// const restricted = "./middleware/restricted"
// const data = require("./data.js")
const productsRouter = require("../api/products/products-router");
const usersRouter = require("../api/users/users-router");
const orderRouter = require("../api/orders/order-router");
const { default: strictTransportSecurity } = require("helmet/dist/middlewares/strict-transport-security");
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY)


const server = express()
server.use(helmet())
server.use(cors())
server.use(express.json())
server.use(express.urlencoded({extended: true}))
server.use(cookieParser())

// fetch data from PG database
server.use("/api/products", productsRouter)
server.use("/api/users", usersRouter)
server.use("/api/orders", orderRouter)

//Paypal Checkout
server.get("/api/config/paypal", (req, res) => {
    res.send(process.env.PAYPAL_CLIENT_ID)
})

// Stripe Checkout
server.post("/api/pay", async (req, res) => {
 const {email, price} = req.body
 const paymentIntent = await stripe.paymentIntents.create({
     amount: price,
     currency: "usd",
     metadata: {integration_check: "accept_a_payment"},
     recepient_email: email
 })
 res.json({"client_secret": paymentIntent["client_secret"]})
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

module.exports = server