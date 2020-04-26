'use strict';

const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');


console.log('trying to connect to db...  ' + process.env.NODE_ENV);
let url = process.env.MONGO_DB_URL.toString()
// console.log(process.env.MONGO_DB_URL);
// if (process.env.NODE_ENV == 'production') {
//     url = dbConfig.prod;
// } else if (process.env.NODE_ENV == 'development') {
//     url = dbConfig.dev_url;
// } else {
//     console.log("Sorry no env variable found");
//     process.exit();
// }
const mongoConnect = new Promise(async (resolve, reject) => {

    if (url === '') {
        console.log("Sorry no env variable found for database");
        process.exit();
    }

    mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    });
    // console.log(m);

    var mongoConn = mongoose.connection;

    mongoConn.on('error', reject);
    mongoConn.once('open', function (callback) {
        // console.log("this",this);
        // this.collections.users.createIndex({ location: '2dsphere' });
        console.log('Successfully connected to MongoDB ::::', process.env.NODE_ENV);
        resolve(true)
    });

    autoIncrement.initialize(mongoConn);
});


module.exports = mongoConnect;
