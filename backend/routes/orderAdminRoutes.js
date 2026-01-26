const expres = require('express');
const Order = require('../models/Order');
const { protect, admin } = require('../middleware/authMiddleware');

const router = expres.Router();

router.get("/", protect, admin, async(req,res)=>{

    try{
        const orders = await Order.find({}).populate("user", "name email")
        res.status(200).json(orders);

    }catch(err)
    {
        console.log(err);
        res.status(500).json({message : "Server Error"});
    }
}
)

router.put("/:id",protect,admin, async(req,res)=>
{
    try{
        const order = await Order.findById(req.params.id).populate("user", "name email");
        if(order)
        {
            order.status = req.body.status || order.status;
            order.isDelivered = order.status === 'Delivered' ? true : order.isDelivered;
            order.deliveredAt = order.status === 'Delivered' ? Date.now() : order.deliveredAt;

            const updatedOrder = await order.save();
            res.status(200).json(updatedOrder);
        }else
        {
            res.status(404).json({message : "Order Not Found"})
        }

    }catch(err)
    {
        console.log(err.message);
        res.status(500).json({message : err.message});

    }
})

router.delete('/:id',protect,admin,async(req,res)=>
{
    try{
        const order = await Order.findById(req.params.id);
        if(order)
        {
            await order.remove();
            res.status(200).json({message : "Order Deleted"});
        }else
        {
            res.status(404).json({message : "Order Not Found"});
        }

    }catch(err)
    {
        console.log(err);
        res.status(500).json({message : "Server Error"});
    }
})

module.exports = router;