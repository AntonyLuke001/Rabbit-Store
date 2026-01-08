const express = require("express");
const Cart = require("../models/Cart");
const Order = require("../models/Order");
const Product = require("../models/Products");
const Checkout = require("../models/Checkout");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();
router.post("/", protect, async (req, res) => {

    const { checkoutItems, shippingAddress, paymentMethod, totalPrice } = req.body;

    if(!checkoutItems || checkoutItems.length === 0)
    {
        return res.status(400).json({message : "No items in the cart"});
    }
    try{
        const newCheckout = await Checkout.create({
            user : req.user._id,
            checkoutItems,
            shippingAddress,
            paymentMethod,
            totalPrice,
            paymentStatus : "pending",
            isPaid : false
        });

        console.log(`Checkout created for user: ${req.user._id}`);
        res.status(201).json(newCheckout);
    }
    catch(err)
    {
        console.log(err);
        res.status(500).json({message : "Server Error"});
    }
})

router.put("/:id/pay", protect, async(req,res)=>
{   
    const { paymentStatus, paymentDetails } = req.body;

    if (!paymentDetails || !paymentDetails.transactionId) {
  return res.status(400).json({ message: "Invalid payment details" });
}


    try{

        console.log(req.params.id);
        console.log(req.user._id);

        const checkout = await Checkout.findById(req.params.id);

        if(!checkout)
        {
            return res.status(404).json({message : "Checkout not found"});
        }

        if (checkout.user.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: "Not authorized" });
    }

        
        if (checkout.isPaid) {
            return res.status(400).json({ message: "Checkout already paid" });
        }

        
        if(paymentStatus === "paid" )
        {
            checkout.isPaid = true,
            checkout.paidAt = Date.now(),
            checkout.paymentDetails = paymentDetails,
            checkout.paymentStatus = paymentStatus

            await checkout.save();

            res.status(200).json(checkout)
        }else {
            return res.status(400).json({message : "Invalid payment status"});
        }

    }
    catch(err)
    {
        console.error(err);
        res.status(500).json({message : "Server Error"});
    }
})

router.post("/:id/finalize", protect, async(req,res)=>
{
    try{
        const checkout = await Checkout.findById(req.params.id);
        if(!checkout)
        {
            return res.status(404).json({message : "Checkout not found"});
        }

        if (checkout.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "Not authorized" });
        }
    
        if(checkout.isPaid && !checkout.isFinalised)
        {
            const order = await Order.create({
                user : checkout.user,
                orderItems : checkout.checkoutItems,
                shippingAddress : checkout.shippingAddress,
                paymentMethod : checkout.paymentMethod,
                totalPrice : checkout.totalPrice,
                isPaid : true,
                paidAt : checkout.paidAt,
                isDelivered : false,
                paymentStatus : "paid",
                paymentDetails: checkout.paymentDetails
            }) 

            checkout.isFinalised = true;
            checkout.finalisedAt = Date.now();

            await checkout.save();
            await Cart.findOneAndDelete({user : checkout.user});

            res.status(201).json(order);
        }
        else if(checkout.isFinalised)
        {
            return  res.status(400).json({message : "Checkout already finalised"});
        }
        else
        {
            return res.status(400).json({message : "Checkout not paid"});
        }

    }catch(err)
    {
        console.error(err);
        res.status(500).json({message : "Server Error"});
    }
})

module.exports = router;