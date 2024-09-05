const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require("../models/userModel")
require('dotenv').config()

const login = async (req, res) => {
    const { email , password } = req.body
    
    const user = await User.findOne({email: email}).exec()
    if(!user){
        return res.status(404).send("Unautherised Access, User not found")
    }
    const passMatche = bcrypt.compareSync(password, user.password)

    if(passMatche){
        const token = jwt.sign(
            { _id: user._id, email: user.email, name: user.name },  
            process.env.TOKEN_SECRET ); 
        res.cookie('token', token, { httpOnly: true, secure: process.env.ENVIRONMENT === 'development' ? false : true, maxAge: 1*60*60*1000, sameSite: "None"})
        res.status(202).json({_id: user._id, email: user.email, name: user.name})
    } else {
        res.status(404).json({massage:"password is incorrect"})
    }  
} 

const logout = async (req, res) => {
    res.clearCookie('token', { path: '/' });
    res.clearCookie('refreshToken', { path: '/' });
    res.status(200).send({ message: 'Logout successful' });
}

const verifyLogin = (req, res) => {
    res.status(200).json(req.user)
}

module.exports = {
    login,
    logout,
    verifyLogin
}