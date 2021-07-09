const router = require("express").Router()
const products = require("./products-model")

router.get("/", async (req, res, next) => {
    try {
        const productList = await products.getProducts()
        res.status(200).json(productList)
    } catch(err) {
        next(err)
    }
})

router.get("/:id", async (req, res, next) => {
    try{
        const product = await products.getProductById(req.params.id)
        if(product) {
            res.status(200).send(product)
        } else {
            res.status(404).send({message: "Product does not exist"})
        }
    } catch(err) {
        next(err)
    }
})

module.exports = router