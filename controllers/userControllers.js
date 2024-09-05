const User = require("../models/userModel")
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const getAllUsers = async (req, res) =>{
    const users = await User.find({});
    res.json(users)
}
const addUser = async (req, res) =>{
    console.log("user at", req.body)
    const userData = req.body
    const hash = bcrypt.hashSync(userData.password, saltRounds);
    const user = new User({
        ...userData,
        password: hash
    })
    await user.save()
    const token = jwt.sign(
        { _id: user._id, email: user.email, name: user.name },  
        process.env.TOKEN_SECRET );  
    res.cookie('token', token, { httpOnly: true, secure: process.env.ENVIRONMENT === 'development' ? false : true, maxAge: 1*60*60*1000, sameSite: 'None'})
    res.status(202).json({_id: user._id, email: user.email, name: user.name})
}

module.exports ={
    getAllUsers,
    addUser
}