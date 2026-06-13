const userModel = require("../models/user.model")


/**
 * @name registerUserController
 * @description register a new user, expects username, email and password in the request body
 * @acess Public
 */


async function registerUserController(req,res) { 

    const {username, email,password} = req.body

    if(!username || !email || !password){
        return res.status(400).json({
            message : "please provide username,email, password"
        })
    }
    const isUserALreadyExists = await userModel.findOne({
        $or: [ { username } , { email } ]
    })

    if(isUserAlredyExists) {
        return res.status (400).json({
            message: "Account already exist with this email address or username"
        })
    }
} 

module.exports = { 
    registerUserController
}