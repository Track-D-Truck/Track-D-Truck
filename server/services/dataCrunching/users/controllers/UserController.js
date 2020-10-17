const { checkPassword } = require('../helpers/bcrypt')
const { encode } = require('../helpers/jwt')
const { User } = require('../models')

class UserController {
    static register (req, res, next) {
        const { username, email, password, role="Driver" } = req.body
        if (!username) {
            throw {
                name: 'EmptyField',
                status: 400,
                message: 'username cannot be empty'
            }
        }
        if (!email) {
            throw {
                name: 'EmptyField',
                status: 400,
                message: 'email cannot be empty'
            }
        }
        if (!password) {
            throw {
                name: 'EmptyField',
                status: 400,
                message: 'password cannot be empty'
            }
        }
        User.create({
            username,
            email,
            password,
            role
        })
            .then(newUser => {
                console.log('--------------2');
                const access_token = encode ({
                    id: newUser.id,
                    username: newUser.username,
                    email: newUser.email
                })
                return res.status(201).json({ access_token })
            })
            .catch(err => {
                next(err)
            })
    }

    static login (req, res, next) {
        let message;
        const { email, password } = req.body;
        if (!email) {
            message = 'email cannot be empty';
        };
        if (!password) {
            message = 'password cannot be empty';
        };
        if (message) {
            throw {
                status: 400,
                name: 'EmptyField',
                message: message
            };
        };
        User.findOne({
            where: {email: req.body.email}
        })
            .then(data => {
                if (!data) {
                    throw {
                        status: 404,
                        name: 'NotFound',
                        message: 'user not found'
                    }
                }
                if (checkPassword(password, data.password)) {
                    const access_token = encode ({
                        id: data.id,
                        username: data.username,
                        email: data.email
                    })
                    return res.status(200).json({ access_token })
                } else {
                    throw {
                        name: 'ValidationError',
                        message: 'Username or password incorrect',
                        status: 401
                    }
                }
            })
            .catch (err => {
                next(err)
            })
    }
}

module.exports = UserController;