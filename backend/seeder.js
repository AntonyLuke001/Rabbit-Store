const mongoose = require('mongoose');
const dotenv = require('dotenv');

const User = require('./models/user');
const Product = require('./models/Products');

const products = require('./data/products');

dotenv.config();

mongoose.connect(process.env.MONGO_URI);

const seed = async()=>
{
    try{
    await User.deleteMany();
    await Product.deleteMany();

    const createdUser = await User.create({
        name : "Admin User",
        email : "admin@gmail.com",
        password : "123456",
        role : "admin"
    });

    const sampleProducts = products.map(product => {
        return {...product,user : createdUser._id}
    })

    await Product.MONGO_URI

    const userId = createdUser._id;

    await Product.insertMany(sampleProducts);
    console.log("Data Seeded Successfully");
    process.exit();

    }catch(err)
    {
        console.log(err);
        process.exit(1);
    }

}

seed();