const jwt = require('jsonwebtoken');
// const unless = require('express-unless');

function authenticateToken(req, res, next){
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(' ')[1];

    if(token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
        if(err) return res.sendStatus(403);
        req.user = user;
        next();
    })
};

function generateAccessToken(username){
    return jwt.sign({data: username}, process.env.SECRET_KEY, {
        expiresIn: "1h"
    });
}

// authenticateToken.unless = unless;

module.exports = {
    authenticateToken,
    generateAccessToken,
}

// const jwt = require('jsonwebtoken');

// function authenticateToken(req, res, next) {
//     const authHeader = req.headers["authorization"];
//     const token = authHeader && authHeader.split(' ')[1];

//     const excludedRoutes = ["/users/login", "/users/register"];

//     if (token == null && !excludedRoutes.includes(req.path)) {
//         return res.sendStatus(401);
//     }

//     jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
//         if (err && !excludedRoutes.includes(req.path)) {
//             return res.sendStatus(403);
//         }
//         req.user = user;
//         next();
//     });
// }

// function generateAccessToken(username){
//     return jwt.sign({data: username}, process.env.SECRET_KEY, {
//         expiresIn: "1h"
//     });
// }

// module.exports = authenticateToken, generateAccessToken;

