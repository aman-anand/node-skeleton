if (process.env.NODE_ENV === "production") {
    require('dotenv').config({path: '.env.prod'})
    // console.log(__dirname + '/components/envs/.env.prod');
} else {
    require('dotenv').config({path: '.env.dev'})
    // console.log(__dirname + '/components/envs/.env.development');
}
// console.log(process.env.PORT);
module.exports = {...process.env}

