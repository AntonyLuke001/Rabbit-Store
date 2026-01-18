const express = require('express');
const User = require("../models/user")
const { protect, admin } = require("../middleware/authMiddleware")

const router = express.Router();

/*
|--------------------------------------------------------------------------
| GET ALL USERS (ADMIN ONLY)
|--------------------------------------------------------------------------
| Purpose:
| - Admin can view all users
| - Sorted by latest created users first
*/

router.get("/", protect,admin,async(req,res)=>
{
    try{
        const users = await User.find({}).sort({createdAt : -1});
        res.status(200).json(users);
    }
    catch(err)
    {
        console.log(err);
        res.status(500).json({message : "Server Error"});
    }
} )

/*
|--------------------------------------------------------------------------
| CREATE USER (ADMIN ONLY)
|--------------------------------------------------------------------------
| Purpose:
| - Admin creates internal users (admin / staff)
| - NOT normal customers
*/

router.post("/",protect,admin, async(req,res)=>
{
    const { name,email,password,role } = req.body;

    try{

        let user = await User.findOne({email});
        
        if(user)
        {
            return res.status(400).json({message : "User already exists"});
        }

        user = new User({name,email,password,role});
        await user.save();
        res.status(201).json({message : "User created successfully"});
    }catch(err)
    {
        console.log(err);
        res.status(500).json({message : "Server Error"});
    }
})

router.put("/:id",protect,admin, async(req, res)=>
{
    const { name,email,role } = req.body;

    try{

        let user = await User.findById(req.params.id);

        if(!user)
        {
            return res.status(404).json({message : "User not found"});
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
        }

        const allowedRoles = ["user", "admin"];
        const userRole = allowedRoles.includes(role) ? role : "user";

        user.name = name || user.name ;
        user.email = email || user.email;
        user.role = role || user.role ; 

        await user.save();
        res.status(200).json({message : "User updated successfully",
            user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
        },
        );
    }catch(err)
    {
        console.log(err);
        if (err.code === 11000) {
        return res.status(400).json({ message: "Duplicate field value" });
        }

        res.status(500).json({message : "Server Error"});
    }
})

router.delete("/:id",protect,admin, async(req,res)=>
{
    try{
        const user = await User.findById(req.params.id);

        if(!user)
        {
            return res.status(404).json({message : "User not found"});
        }

        await user.deleteOne();
        res.status(200).json({message : "User deleted successfully"});

    }catch(err)
    {
        console.log(err);
        res.status(500).json({message : "Server Error"});
    }

})

module.exports = router;