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

module.exports = restricted