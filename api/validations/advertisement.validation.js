const Joi = require('joi');

module.exports = {
    // GET music/v1/song
    getDetails: {
        query: {
            id: Joi.string().min(1).required(),
            country: Joi.string().uppercase({force: true}).optional(),

        },
    },
    changeStatus: {
        query: {
            id: Joi.string().min(1).required(),
        },
    },
    list: {
        query: {
            country: Joi.string().uppercase({force: true}).allow('').optional(),
        },
    },

    // POST /v1/auth/login
    edit: {
        body: {
            id: Joi.string().required(),
            listPref: Joi.number().required(),
            media: Joi.array().required(),
            name: Joi.string().required(),
            title: Joi.string().required(),
            displayPref: Joi.number().allow(0, 1).required(),
            country: Joi.string().uppercase({force: true}).required()
        },
    },
    //post
    add: {
        body: {
            listPref: Joi.number().required(),
            media: Joi.array().required(),
            name: Joi.string().required(),
            title: Joi.string().required(),
            displayPref: Joi.number().allow(0, 1).required(),
            country: Joi.string().uppercase({force: true}).required()
        },
    },


};
