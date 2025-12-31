const express = require('express')
const Product = require('../models/Products')
const router = express.Router();
const { protect, admin } = require('../middleware/authMiddleware')


router.post('/', protect , admin , async (req,res)=>
{
    try{
        const { 
            name,
            description,
            price,
            discountPrice,
            countInStock,
            category,
            brand,
            sizes,
            colors,
            collections,
            material,
            gender,
            images,
            isFeatured,
            isPublished,
            tags,
            dimentions,
            weight,
            sku
         } = req.body;

         const product = new Product({
            name,
            description,
            price,
            discountPrice,
            countInStock,
            category,
            brand,
            sizes,
            colors,
            collections,
            material,
            gender,
            images,
            isFeatured,
            isPublished,
            tags,
            dimentions,
            weight,
            sku,
            user : req.user._id
         });

         const createdProduct = await product.save();

         res.status(201).json(createdProduct);
    }
    catch(err)
    {
        console.log(err);
        res.status(500).send("Server Error");
    }
})

router.put('/:id',protect,admin, async(req,res)=>
{
    try{

        const product = await Product.findById(req.params.id);

        if(product)
        {
            product.name = req.body.name || product.name;
            product.description = req.body.description || product.description;
            product.countInStock = req.body.countInStock || product.countInStock;
            product.category = req.body.category || product.category;
            product.brand = req.body.brand || product.brand;
            product.sizes = req.body.sizes || product.sizes;
            product.colors = req.body.colors || product.colors;
            product.collections = req.body.collections || product.collections;
            product.material = req.body.material || product.material;
            product.gender = req.body.gender || product.gender;
            product.images = req.body.images || product.images;
            product.isFeatured =
                req.body.isFeatured !== undefined ? req.body.isFeatured : product.isFeatured;
            product.isPublished =
                req.body.isPublished !== undefined ? req.body.isPublished : product.isPublished;
            product.tags = req.body.tags || product.tags;
            product.dimentions = req.body.dimentions || product.dimentions;
            product.weight = req.body.weight || product.weight;
            product.sku = req.body.sku || product.sku;

            const updatedProduct = await product.save();
            res.json(updatedProduct);

        }
        else{
            res.status(404).json({message : "Product not found"});
        }
        
    }catch(err)
    {
        console.error(err);
        res.status(500).send("Server Error");
    }

}  )

router.delete('/:id',protect,admin, async(req,res)=>
{
    try{
        const product = await Product.findById(req.params.id);
        if(product)
        {
            await product.deleteOne();
            res.json({message : "Product removed"});
        }
        else
        {
            res.status(404).json({message : "Product not found"});
        }

        }
catch(err)
{
    console.log(err);
    res.status(500).send("Server Error");                                                   
}    
})

// @route   GET /api/products
router.get('/', async(req,res)=>
{
    try{

        console.log(req.query);

        const { collection, size, color, gender, minPrice, maxPrice, sortBy,
            search, category, material, brand, limit
        } = req.query;

        let query = {};

        if(collection && collection.toLocaleLowerCase() !== 'all')
        {
            query.collections = collection;
        }

        if(category && category.toLocaleLowerCase() !== 'all')
        {
            query.category = category;
        }

        if(material )
        {
            query.material = {$in : material.split(',')};
        }

        if(brand )
        {
            query.brand = {$in : brand.split(",")};
        }

        if(size)
        {
            query.sizes = {$in : size.split(',')};
        }

        if(color)
        {
            query.colors = {$in : color.split(',')};
        }

        if(gender)
        {
            query.gender = gender;
        }

        if(minPrice || maxPrice)
        {
            query.price = {};
            if(minPrice) query.price.$gte = Number(minPrice);
            if(maxPrice) query.price.$lte = Number(maxPrice);
        }

        if(search){
            query.$or = [ {name: {$regex : search, $options: "i"}} ,
                {description: {$regex : search, $options: "i"}}
            ];
        }

        sort = {};

        if(sortBy)
        {
            switch(sortBy)
            {
                case "priceAsc":
                    sort = {price:1}
                    break;
                case "priceDesc":
                    sort = {price:-1}
                    break;
                case "popularity":
                    sort = {rating :-1}   
                    break;      
                default:
                    break;    
            }
        }

        
    console.log(query);
    let products = await Product.find(query).sort(sort).limit(Number(limit)||0);
    res.json(products);    


    }catch(err)
    {
        console.log(err);
    }
})

router.get('/best-seller', async(req,res)=>
{
    try{
        const bestSellers = await Product.findOne().sort({rating : -1});
        if(bestSellers)
        {
            res.json(bestSellers);
        }
        else
        {
            res.status(404).json({message : "No best sellers found"});
        }
    }
    catch(err)
    {
        console.log(err);
        res.status(500).send("Server Error");
    }
})

router.get('/new-arrivals', async(req,res)=>
{
    try{
        const newArrivals = await Producy.find().sort({"createdAt" : -1}).limit(8);
        res.json(newArrivals);
    }
    catch(err){
        console.log(err);
        res.status(500).send("Server Error");
    }
})

router.get('/:id', async(req, res)=>
{
    try{
        const product = await Product.findById(req.params.id);
        if(product)
        {
            res.json(product);
        }
        else
        {
            res.status(404).json({message : "Product not found"});
        }
    }catch(err)
    {
        console.log(err);
        res.status(500).send("Server Error");
    }
})

router.get('/similar/:id',async(req,res)=> 
{
    try{
        const id = req.params.id;
        const product = await Product.findById(id);

        if(!product)
        {
            return res.status(404).json({message : "Product not found"});
        }

        const similarProducts = await Product.find({
            gender : product.gender,
            category : product.category,
            _id : {$ne : product._id}
        }).limit(4);

        res.json(similarProducts);
    }
    catch(err)
    {
        console.log(err);
        res.status(500).send("Server Error");
    }
}
)

module.exports = router;