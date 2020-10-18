const jwt = require('jsonwebtoken')
const secret = "JanganLupaMandi"

const encode = (data) => jwt.sign(data, secret);

const decode = (token) => jwt.verify(token, secret);


module.exports = {encode, decode}