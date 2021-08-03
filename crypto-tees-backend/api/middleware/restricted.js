const jwt = require("jsonwebtoken")
const secret = process.env.JWT_SECRET || "secret message"

const restricted = async(req, res, next) => {
    try{
        const token = req.headers.authorization

        // user not logged in
        if(!token) {
            return res.status(401).json({
                message: "You must be logged in to access this page"
            })
        }

        jwt.verify(token, secret, (err, decoded) => {
            // invalid token 
            if(err) {
                return res.status(401).json({
                    message: "invalid token"
                })
            }
            // if token is valid
            req.token = decoded
            next()
        })

    } catch(err) {
        next(err)
    }
}

const isAuth = (req, res, next) => {
    const authorization = req.headers.authorization
    if(authorization) {
        const token = authorization.slice(7, authorization.length)
        jwt.verify(token, secret, (err, decoded) => {
            if(err) {
                res.status(401).send({message: "Invalid token"})
            } else {
                req.user = decoded
                next
            }
        })
    }
}

module.exports = {
    restricted,
    // isAuth
}