"use strict"
const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET;

function encode (obj) {
    return jwt.sign(obj, secretKey);
};

module.exports = {
    encode
};