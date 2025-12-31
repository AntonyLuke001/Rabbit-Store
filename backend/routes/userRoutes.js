const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const {protect} = require('../middleware/authMiddleware');

const router = express.Router();

router.post("/register",async (req,res)=>
{
    const {name,email,password} = req.body;

    try{
        let user = await User.findOne({email});

        if(user) return res.status(400).json({message:"User already exists"});

        user = new User({name,email,password});
        await user.save();

        const payload = {
            user : {
                id : user.id,
                role : user.role
            }
        }

        const token = jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:'40h'});

            res.status(201).json(
        {
            user:{
                id : user.id,
                name : user.name,
                email : user.email,
                role : user.role
            },
            token : token
        });
    }
    catch(err)
    {
        console.log(err);
        res.status(500).send("Server Error");
    }
});

router.post('/login', async (req,res)=>
{
    const {email,password} = req.body;

    try{
        let user = await User.findOne({email});

        if(!user) return res.status(400).json({
            message : "Invalid Credentials"
        });

        const isMatch = await user.matchPassword(password);

        if(!isMatch) return res.status(400).json({
            message : "Invalid Credentials"
        });

        const payload = {
            user : {
                id : user.id,
                role : user.role
            }
        }

        const token = jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:'40h'});

            res.json(
        {
            user:{
                id : user.id,
                name : user.name,
                email : user.email,
                role : user.role
            },
            token : token
        });
        

    }
    catch(err){

        console.log(err);
        res.status(500).send("Server Error");

    }
})

router.get('/profile',protect, async (req,res)=>
{
    res.json(req.user);
} )

module.exports = router;