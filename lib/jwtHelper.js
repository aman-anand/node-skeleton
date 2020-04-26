const expressJwt = require('express-jwt');
const jwt2 = require('jsonwebtoken');
// const config = require('./config-app.json');


const secret = process.env.JWT_SECRET;
let jwt = () => {
    let t = expressJwt({secret}).unless({
        path: [
            // public routes that don't require authentication
            '/api/v1/user/login',
            '/api/v1/user/register',
            '/api/v1/backend/user/register',
            '/api/v1/backend/user/login',
            // '/api/v1/user/',
            '/api/v1/upload',
            '/api/v1/postman'
        ]
    })
    return t;
}
let signToken = (data) => jwt2.sign({sub: data}, secret, {expiresIn: process.env.JWT_EXPIRES_IN});
module.exports = {middleware: jwt, sign: signToken};

