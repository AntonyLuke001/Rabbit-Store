const mongoose = require("mongoose");

const checkoutItemSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Product'
    },
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity : {
        type : Number,
        required : true,
        default : 1
    }
},
{_id : false}
);

const checkoutSchema = new mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    checkoutItems : [checkoutItemSchema],
    shippingAddress : {
        address : {
            type : String,
            required : true
        },
        city : {
            type : String,
            required : true
        },
        postalCode : {
            type : String,
            required : true
        },
        country : {
            type : String,
            required : true
        }
    },
    paymentMethod : {
        type : String,
        required : true
    },
    totalPrice : {
        type : Number,
        required : true
    },
    isPaid : {
        type : Boolean,
        default : false
    },
    paidAt : {
        type : Date
    },
    paymentStatus : {
        type : String,
        enum : ["pending","paid","failed"],
        default : "pending"
    },
    paymentDetails: {
        transactionId: { type: String },
        paymentGateway: { type: String },
        amount: { type: Number },
        currency: { type: String }
    },
    isFinalised: {
        type: Boolean,
        default: false
    },
    finalisedAt : {
        type : Date
    }
}
,
{ timestamps : true }
);

module.exports = mongoose.model("Checkout",checkoutSchema);