const express = require('express');
const Product = require('../models/Products');

const { protect, admin } = require('../middleware/authMiddleware');
const router = express.Router();

router.get("/", protect, admin, async(req,res)=>
{
    try{
        const products = await Product.find({});
        res.status(200).json(products);

    }catch(err)
    {
        console.log(err);
        res.status(500).json({message : "Server Error"});
    }
})

router.put('/:id',protect,admin, async(req,res)=>
{
    try{
        const order = await Product.findById(req.params.id);
        if(order)
        {
            order.status = req.body.status || order.status;
            order.isDelivered = order.status === 'Delivered' ? true : order.isDelivered;
            order.deliveredAt = order.isDelivered ? new Date() : null;
        }

        const updatedOrder = await order.save();
        res.status(200).json(updatedOrder);
    }catch(err)
    {
        console.log(err);
        res.status(500).json({message : "Server Error"});
    }
})

module.exports = router;