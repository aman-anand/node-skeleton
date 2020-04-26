'use strict';

const properties = require('../../package.json')

const controllers = {
    about: function (req, res) {
        const aboutInfo = {
            name: properties.name,
            version: properties.version
        }
        res.json(aboutInfo);
    },

};

module.exports = controllers;
