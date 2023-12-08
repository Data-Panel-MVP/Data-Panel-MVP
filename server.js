//added server.js in package.json so use npm run serve



const express = require('express')
const mongoose = require('mongoose')//conected to mongodb
const Product = require('./models/productModels')
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))

//routes- we have to declare routes so that web browser access the our web page

app.get('/', (req, res) => {
    res.send('Hello Node API (changing to see nodemon')
})

app.get('/blog', (req, res) => {
    res.send('Hello testing GET')
})

app.get('/products', async(req, res) => {//for fetching or getting data from database
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

app.get('/products/:id', async(req, res) =>{//fetching product via ID
    try {
        const {id} = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})


app.post('/products', async(req, res) => {
    try {
        const product = await Product.create(req.body)
        res.status(200).json(product);
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})

//update a product
app.put('/products/:id', async(req, res) => {//here route is PUT make sure to use PUT in postman to getting products
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);
        // we cannot find any product in database
        if(!product){
            return res.status(404).json({message: `cannot find any product with ID ${id}`})
        }
        const updatedProduct = await Product.findById(id);
        res.status(200).json(updatedProduct);
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

// // delete a product

app.delete('/products/:id', async(req, res) =>{//here route is DELETE make sure to use DELETE in postman to getting products
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id);
        if(!product){
            return res.status(404).json({message: `cannot find any product with ID ${id}`})
        }
        res.status(200).json(product);
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

mongoose.set("strictQuery", false)
mongoose.connect('mongodb+srv://AYUSH:9835456039@cluster0.hofxigh.mongodb.net/?retryWrites=true&w=majority')//connected to atlas
.then(() => {
    console.log('connected to MongoDB')//when app is conncted to mongodb it will display this message 
    app.listen(3000, ()=> {
        console.log(`App is running on port 3000 <ayush bhai>`)//after connected to mongodb it will shows App is running..
    });
}).catch((error) => {
    console.log(error)//if there is any issue it will shows "error"
})