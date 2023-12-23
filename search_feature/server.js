const express = require('express');
const Product = require('./models/productModel')

const app = express();
const mongoose = require('mongoose');
// const dbconfig = require("./config/dbConfig");

require('dotenv').config();

app.use(express.json());

//search request  
// app.get("/search/:key", async(req, res) =>{
//     let data = await Product.find(
//         {
//             "$or":[
//                 {"product_name": {"$regex": req.params.key}},
//                 {"brand": {"$regex": req.params.key}},
//                 {"category": {"$regex": req.params.key}},
//                 {"group": {"$regex": req.params.key}},
//                 {"subgroup": {"$regex": req.params.key}},
//                 // {"_id": {"$regex": req.params.key}},
//             ]
//         }
//     );
//     // data = await Product.findById(id);
    
//     res.send(data);
// })

app.get("/search/:key", async (req, res) => {
    const searchKey = new RegExp(req.params.key, 'i');   //here it will search correctly wheather the name is in uppercase or lowercase
  
    let data = await Product.find({
      "$or": [
        { "product_name": { "$regex": searchKey } },
        { "brand": { "$regex": searchKey } },
        { "category": { "$regex": searchKey } },
        { "group": { "$regex": searchKey } },
        { "subgroup": { "$regex": searchKey } },
        // { "_id": { "$regex": searchKey } },
      ]
    });
  
    res.send(data);
  });
  

//database connection
const PORT = process.env.PORT || 4000;
mongoose.connect(`mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@login-api-data.prycr61.mongodb.net/${process.env.MONGODB_DATABASE_NAME}?retryWrites=true&w=majority`)
.then(() =>{
    console.log("Connected to Mongodb")
    app.listen(PORT, () =>{
        console.log(`Server is running on port ${PORT}`)
    })
    
}).catch((error) =>{
    console.log(error)
})


// mongoose.connect(dbconfig.db, {
// }).then(() =>{
//     console.log("Connected to Mongodb")
//     app.listen(PORT, () =>{
//         console.log(`Server is running on port ${PORT}`)
//     })
    
// }).catch((error) =>{
//     console.log(error)
// });

