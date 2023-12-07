const express = require('express');
const mongoose = require('mongoose');
const { unless } = require("express-unless")

require('dotenv').config();
const dbConfig = require('./config/db_config');

const auth = require('./middlewares/auth');
const errors = require('./middlewares/error');


const app = express();

mongoose.Promise  = global.Promise;  //so that we can use mongoose in any part in our application
mongoose.connect(dbConfig.db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(
    ()=>{
            console.log("Hello Plypicker-------------------")
            console.log("Connected to Database");  //connection for mongodb
        },(error) => {
            console.log(`Databse not connected ${error}`);
        }
    
);

auth.authenticateToken.unless = unless;  //checks if the user has the correct token or not
app.use(
    auth.authenticateToken.unless({     //this is written so that we can bypass these pages bcoz we do not require any token for these pages
        path: [   
            {url: "/users/login", methods: ["POST"]},  
            {url: "/users/register", methods: ["POST"]},
        ],
    })
);
// app.use(auth);

// const pathsToExclude = ["/users/login", "/users/register"];

// // Apply middleware to check for token authentication
// app.use((req, res, next) => {
//     if (pathsToExclude.includes(req.path)) {
//         // If the path is in the exclusion list, skip authentication
//         return next();
//     }
//     // For other paths, apply authentication middleware
//     return auth(req, res, next);
// });


//------------------------------------------------
app.use(express.json());  //for recognising the requestas a json object and it alsoacts as a middleware 

//initialising routes 
app.use("/users", require("./routes/user_route"))  

app.use(errors.errorHandler);     //error handling with the middlewares in middleares folder

const PORT = process.env.PORT || 4000;  //initialising both with the env file and the port itself so that the app does not crash
app.listen(PORT, function(){
    console.log(`Server is running on port ${PORT}`)
})