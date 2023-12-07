const mongoose = require('mongoose');
const { Schema } = mongoose;
const uniqueValidator = require('mongoose-unique-validator');     //for checking of duplicate entries

const userSchema = new Schema({
    username: { type: String, required: true , unique: true},
    email: {type: String, required: true , unique: true},
    password: { type: String, required: true},
    date: { type: Date, default: Date.now()}
})

userSchema.set("toJSON", {
    transform: (document, returnedObject) =>{
        returnedObject.id= returnedObject._id.toString();  //returned object is the one that will be sent to client side
        delete returnedObject._id;
        delete returnedObject.__v;
        delete returnedObject.password;
    }
})

userSchema.plugin(uniqueValidator, {message: "Email already in use!"});

const User = mongoose.model("user", userSchema);
module.exports=User;