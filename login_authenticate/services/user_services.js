const User = require('../models/user_model')
const bcryptjs  = require("bcryptjs")
const auth = require('../middlewares/auth');

async function login({username, password}, callback){
    const user = await User.findOne({username});

    if(user != null){
        if(bcryptjs.compareSync(password, user.password)){
            const token = auth.generateAccessToken(username);
            return callback(null, {...user.toJSON(), token});
        }else{
            return callback({
                message: "Invalid Password"
            });
        }
    }
    else{
        return callback({
            message: "Invalid password"
        })
    }
}

async function register(params, callback){
    if(params.username === undefined){
        return callback({message: "Username required"});
    }

    const user = new User(params);
    user.save()
    .then((response) =>{
        return callback(null, response);
    })
    .catch((error)=>{
        return callback(error);
    })
}

module.exports = {
    login,register
}