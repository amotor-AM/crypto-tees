const router = require("express").Router();
const orders = require("./order-model");
// const isAuth = require ("../middleware/restricted");


router.post("/new", async(req, res, next) => {
    try {
        const {orderItems, shippingAddress, paymentMethod, itemsPrice, shippingPrice, taxPrice, totalPrice, user} = req.body
        if(orderItems.length === 0) {
            res.status(400).send({message: "cart is empty"})
        } else {
            const order = await orders.createOrder({
              user: user,
              items: orderItems,
              price: itemsPrice,
              shipping: shippingPrice,
              tax: taxPrice,
              total: totalPrice,
              payment_method: paymentMethod,
              shipping_address: shippingAddress 
            })
            res.status(201).send({ message: "Order created successfully", order})
        }
    } catch(err) {
        next(err)
    }
})

module.exports = router