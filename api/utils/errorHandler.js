const {getRes} = require('./helper')

function errorHandler(err, req, res, next) {
    if (typeof (err) === 'string') {
        // custom application error
        return res.status(400).json(getRes(false, null, err));
    }

    if (err.name === 'UnauthorizedError') {
        // jwt authentication error
        return res.status(401).json(getRes(false, null, err, 'invalid token'));
    }
    if (err.name === 'Not Found') {
        // jwt authentication error
        return res.status(401).json(getRes(false, null, err, 'Not Found'));
    }
    console.log(err);
    // default to 500 server error
    return res.json(getRes(false, null, err));
}

module.exports = errorHandler;
