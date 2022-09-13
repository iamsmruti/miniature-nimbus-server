import User from '../models/user.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import dotenv from 'dotenv'
dotenv.config()

export const registerUser = async (req, res) => {
    // Hash the password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    // Saving the new User
    try {
        const newUser = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: hashedPassword,
            email: req.body.email
        })

        const user = await newUser.save()
        res.status(200).json(user)
    } catch (err) {
        // Check For Duplictaes
        if(err.keyPattern.email) res.send("Email Already Exist")
        else if(err.keyPattern.username) res.send("Username Already Exist")
        res.status(500).json(err)
    }
}

export const loginUser = async (req, res) => {
    // If User with entered Email exists
    const user = await User.findOne({ email: req.body.email})
    if(!user) return res.status(400).json("Incorrect Email")

    // If exists , the password is checked
    const validPass = await bcrypt.compare(req.body.password, user.password)
    if(!validPass) return res.status(400).json("Incorrect Password")

    // JWT Token
    const token = jwt.sign({
        email: user.email
    }, process.env.TOKEN_SECRET)

    res.cookie('token', token).json(token)
}

export const logoutUser = async (req, res) => {
    res.localStorage.remove('token')
}