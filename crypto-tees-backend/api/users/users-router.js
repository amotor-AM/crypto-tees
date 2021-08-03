const router = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const user = require("./users-model.js");

dotenv.config()


/* I added a bit of optimization on this request to hopefully improve preformance
and reduce server overhead as much as possible. I only use bcrypt if the user info
is returned from the server. If userInfo does not exist I know the user is not found
with the supplied email. I can then provide a more useful error message to the front end.
Although the preformance improvements achieved are miniscule, as the application scales
small improvements like this will add up. After all this is one of the most used and most
complex request that the server will handle.*/
router.post("/login", async (req, res, next) => {
    try {
        const {email, password} = req.body
        if(!email || !password) {
            //ambiguous error. Protects against direct injection attacks
            return res.status(400).json({
                error: "please supply the required information"
            })
        }
        const userInfo = await user.findUser({email}).first()
        if(userInfo) {
            comparePasswords = await bcrypt.compare(password, userInfo.password)
        } else {
            return res.status(401).json({
                message: "email was not found. Would you like to sign up instead?"
            })
        }
        if(!comparePasswords) {
            return res.status(401).json({
                message: "password is incorrect"
            })
        }
        const token = jwt.sign({
            user: userInfo.id,
            name: userInfo.name
        }, process.env.JWT_SECRET, {expiresIn: "30d"})
        await user.setUserAsLoggedIn(userInfo.id)
        res.cookie("token", token)
        res.status(200).send({
          id: userInfo.id,
          name: userInfo.name,
          email: userInfo.email,
          role: userInfo.role,
          message: `Welcome Back ${userInfo.name}`,
          token  
        })
        return
    } catch(err) {
        next(err)
    }
})

router.post("/register", async (req, res, next) => {
    try {
        const {name, password, email} = req.body
        //ambiguous error. Protects against direct injection attacks.
        if(!name || !password || !email){
            return res.status(403).json({
                message: "Please supply the required information"
            })
        }
        const existingUser = await user.findUser({email}).first()
        if(!existingUser) {
            hashedPW = await bcrypt.hash(password, 10)
            const newUser = await user.signup({name, password: hashedPW, email})
            const userToken = {user: newUser.id, name: newUser.name}
            const token = jwt.sign(userToken, process.env.JWT_SECRET, {expiresIn: "1d"})
            await user.setUserAsLoggedIn(newUser.id)
            res.cookie("token", token)
            res.status(200).send({
                id: newUser.id,
                name: newUser.name,
                email: newUser.email,
                role: newUser.role,
                message: `Welcome ${newUser.name}`,
                token  
              })
              return
        } else {
            res.status(403).json({
                message: "email already exists. Would you like to sign in instead?"
            })
        }   
    } catch(err) {
        next(err)
    }
})

router.post("/logout", async (req, res, next) => {
    try {
        const authHeader = req.headers["authorization"]
        const token = authHeader && authHeader.split(" ")[1]
        if(!token) {
            return res.sendStatus(401)
        }
        jwt.verify(token, process.env.JWT_SECRET, (err, userToken) => {
            if(err) {
                return res.setStatus(403)
            }
            req.userInfo = userToken 
        })
        await user.setUserAsLoggedOut(req.body)
        req.session.destroy((err) => {
            if(err) {
                next(err)
            } else {
                return res.status(204).end()
            }
        })
    } catch(err) {
        next(err)
    }
})


router.post("/change-role", async (req, res, next) => {
    try {
        const {email, role} = req.body
        await user.changeUserRole({email}, {role})
        return res.status(200).json("success")
    } catch(err) {
        next(err)
    }
})

router.delete("/purge-user-info", async (req, res, next) => {
    try {
        const {email} = req.body
        await user.removeUser({email})
        return res.status(200).json("success")
    } catch(err) {
        next(err)
    }
})

module.exports = router
