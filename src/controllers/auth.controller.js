const userModel = require("../models/user.model")
const bcrypt =  require("bcryptjs")
const jwt = require ("jsonwebtoken")

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
    const isUserAlreadyExists = await userModel.findOne({
        $or: [ { username } , { email } ]
    })

    if(isUserAlreadyExists) {
        return res.status (400).json({
            message: "Account already exist with this email address or username"
        })
    }


const hash = await bcrypt.hash(password, 10)

const user = await userModel.create({
    username,
    email,
    password: hash
})


const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);


res.cookie("token", token)


res.status(201).json({
    message: "User Registered Successfully",
    user: {
        id: user._id,
        username: user.username,
        email: user.email
    }
})

}

/**
 * @name loginUserController
 */
async function loginUserController(req, res) {
    try {
        const { email, password } = req.body;

        
        const user = await userModel.findOne({ email });

        
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

    
        return res.status(200).json({ 
            message: "Login placeholder success", 
            user 
        });

    } catch (err) {
        // 4. Catch block prevents the server from hanging if a database error happens
        return res.status(500).json({ error: err.message });
    }
}



module.exports = { 
    registerUserController,
    loginUserController
}