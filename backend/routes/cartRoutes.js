const express = require('express');
const Cart = require('../models/Cart');
const Product = require('../models/Products');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

const getCart = async(userId,guestId)=>
{
    if(userId)
    {
        return await Cart.findOne({user : userId});
    }
    else if(guestId)
    {
        return await Cart.findOne({ guestId});
    }

    return null;
}

router.post("/", async (req,res)=>
{
    const {productId,quantity,size,color,guestId,userId} = req.body;
    try{

        const product = await Product.findById(productId);

        if(!product)
        {
            return res.status(404).json({message : "Product not found"});
        }

        let cart = await getCart(userId,guestId);

        if(cart)
        {
            const productIndex = cart.products.findIndex(
                (item) => item.productId.toString() === productId &&
                item.size === size &&
                item.color === color
            );

            if(productIndex>-1)
            {
                cart.products[productIndex].quantity += quantity;
            }
            else {
                cart.products.push({
                    productId,
                    name : product.name,
                    image : product.images[0],
                    price : product.price,
                    size,
                    color,
                    quantity
                });
            }

            cart.totalPrice = cart.products.reduce(
                (acc,item) => acc + item.price*item.quantity
                ,0
            )

            await cart.save();
            return res.status(200).json(cart);

        }
        else
        {
            const cart = await Cart.create({
                user: userId? userId : undefined,
                 guestId: userId
                ? undefined
                : guestId || "guest_" + Date.now(),
                products : [{
                    productId,
                    name : product.name,
                    image : product.images[0].url,
                    price : product.price,
                    size,
                    color,
                    quantity
                }],
                totalPrice : product.price*quantity
            });
            return res.status(201).json(cart);
        }

    }
    catch(err)
    {
        console.log(err);
        res.status(500).json({message : "Server Error"});
    }
})

router.put("/", async(req,res)=>
{
    const {productId,quantity,size,color,guestId,userId} = req.body;
    try{
        let cart = await getCart(userId,guestId);
        if(!cart)
        {   
            return res.status(404).json({message : "Cart not found"});
        }

        const productIndex = cart.products.findIndex((item)=>
            item.productId.toString() === productId &&
            item.size === size &&
            item.color === color
        )

        if(productIndex>-1)
        {
            if(quantity > 0)
            {
                cart.products[productIndex].quantity = quantity;
            }
            else
            {
                cart.products.splice(productIndex,1);
            }
            if (cart.products.length === 0) {
            await cart.deleteOne();
            return res.status(200).json({ message: "Cart deleted successfully" });
        }   

            cart.totalPrice = cart.products.reduce ((acc,item)=>
                    acc + item.price * item.quantity
            ,0)

            await cart.save();
            return res.status(200).json(cart);
        }
        else
        {
            return  res.status(404).json({message : "Product not found in cart"});
        }

    }
    catch(err)
    {
        console.log(err);
        res.status(500).json({message : "Server Error"});
    }
})

router.delete("/",async(req,res)=>
{
    const {productId, size, color,guestId,userId} = req.body;
    try{

        const cart = await getCart(userId, guestId);
        if(!cart)
        {
            return res.status(404).json({message : "Cart not found"});
        }

        const productIndex = cart.products.findIndex((item)=>
            item.productId.toString() === productId &&
            item.size === size &&
            item.color === color
        )

        if(productIndex>-1)
        {
            cart.products.splice(productIndex, 1);
             if (cart.products.length === 0) {
            await cart.deleteOne();
            return res.status(200).json({ message: "Cart deleted successfully" });
        }   
            cart.totalPrice = cart.products.reduce((acc, item)=>
                acc + item.price * item.quantity
            ,0)

            await cart.save();
            return res.status(200).json(cart);
        }
        else{
            return res.status(404).json({message : "Product not found in cart"});
        }                                                                                                                       
        


    }catch(err)
    {
        console.log(err);
        res.status(500).json({message : "Server Error"});
    }
})

router.post("/merge", protect, async(req,res)=>
{
    const {guestId} = req.body;

    try{

        const guestCart = await Cart.findOne({guestId : guestId});
        const userCart = await Cart.findOne({user : req.user._id});

        if(guestCart)
        {
            if(guestCart.products.length === 0)
            {
                    return res.status(400).json({message : "Guest Cart is empty"})
            }

            if(userCart)
            {
                guestCart.products.forEach((guestItem)=>
                {
                    const productIndex = userCart.products.findIndex((item)=>
                    item.productId.toString() === guestItem.productId.toString() &&
                    item.size === guestItem.size &&
                    item.color === guestItem.color
                    )

                    if(productIndex > -1)
                    {
                        userCart.products[productIndex].quantity += guestItem.quantity;
                    }
                    else
                    {
                        userCart.products.push(guestItem);
                    }
                });

                userCart.totalPrice = userCart.products.reduce((acc, item)=>
                    acc + item.price * item.quantity
                ,0)
                await userCart.save();
                await guestCart.deleteOne();
                return res.status(200).json(userCart);


            }
            else{
                guestCart.user = req.user._id;
                guestCart.guestId = undefined;
                await guestCart.save();
                return res.status(200).json(guestCart);
            }
        }
        else
        {
            if(userCart)
            {
                return res.status(200).json(userCart);
            }
            res.status(404).json({message : "Guest Cart not found"});
        }

    }
    catch(err)
    {
        console.log(err);
        res.status(500).json({message : "Server Error"});
    }

})

module.exports = router;