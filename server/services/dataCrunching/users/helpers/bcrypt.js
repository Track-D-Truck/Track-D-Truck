const bcrypt = require('bcrypt');
const saltRounds = 5;

function hashPassword (userPassword) {
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(userPassword, salt);
    return hash;
}

function checkPassword (inputPassword, dataPassword) {
    return bcrypt.compareSync(inputPassword, dataPassword);
}

module.exports = {
    checkPassword,
    hashPassword
};
