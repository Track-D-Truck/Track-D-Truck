const request = require('supertest');
const app = require('./www');
const { User, sequelize } = require('../models');
const { queryInterface } = sequelize;

afterAll((done) => {
    return queryInterface.bulkDelete("Users",null, {})
    .then(data => {
        done()
    })
    .catch(err => {
        done (err)
    })
})
beforeAll(async (done) => {
    const userCreate = {
        username: 'username',
        email: "user@user.com",
        password: '1234',
    }
    User.create(userCreate)
        .then(newUser => {
            done()
        })
        .catch(err => {
            done (err)
        })
})

describe('User Routes', () => {
    // describe('GET /', () => {
    //     test('200 Homepage - should return json message', (done) => {
    //         return request(app)
    //             .get('/')
    //             .set('Accept', 'application/json')
    //             .then(response => {
    //                 const { body } = response
    //                 expect(body).toHaveProperty([])
    //             })
    //     })
    // })
    describe('POST /login', () => {
        test('200 Login Succes - should return json message', (done) => {
            const userLogin = {
                email: 'user@user.com',
                password: '1234',
            }
            return request(app)
                .post('/login')
                .send(userLogin)
                .set('Accept', 'application/json')
                .then(response => {
                    const { body, status } = response
                    expect(status).toBe(200)
                    expect(body).toHaveProperty('access_token')
                    done()
                })
                .catch((err) => {
                    done(err)
                })
        })
        test('400 login failed empty email - should return json message', (done) => {
            const userLoginErr = {
                email: '',
                password: '1234'
            }
            return request(app)
                .post('/login')
                .send(userLoginErr)
                .set('Accept', 'application/json')
                .then(response => {
                    const { body, status } = response
                    expect(status).toBe(400)
                    expect(body).toHaveProperty('message', 'email cannot be empty')
                    done()
                })
                .catch((err) => {
                    done(err)
                })
        })
        test('400 login failed empty password - should return json message', (done) => {
            const userLoginError = {
                email: 'user@user.com',
                password: '',
            }
            return request(app)
                    .post('/login')
                    .send(userLoginError)
                    .set('Accept', 'application/json')
                    .then(response => {
                        const { body, status } = response
                        expect(status).toBe(400)
                        expect(body).toHaveProperty('message', 'password cannot be empty')
                        done()
                    })
                    .catch((err) => {
                        done (err)
                    })
        })
        test('404 Login failed incorrect email - should return json message', (done) => {
            const userRegister = {
                email: 'adsdadadsasdas@mail.com',
                password: '1234'
            }
            return request(app)
                .post('/login')
                .send(userRegister)
                .set('Accept', 'application/json')
                .then(response => {
                    const { body, status } = response
                    expect(status).toBe(404)
                    expect(body).toHaveProperty('message', 'user not found')
                    done()
                })
                .catch((err) => {
                    done(err)
                })
        })
        test('401 Login failed incorrect password - should return json message', (done) => {
            const userRegister = {
                email: 'user@user.com',
                password: '123444'
            }
            return request(app)
                .post('/login')
                .send(userRegister)
                .set('Accept', 'application/json')
                .then(response => {
                    const { body, status } = response
                    expect(status).toBe(401)
                    expect(body).toHaveProperty('message', 'Username or password incorrect')
                    done()
                })
                .catch((err) => {
                    done(err)
                })
        })
    })
    describe('POST /register', () => {
        test('201 Register Succes - should return json message', (done) => {
            const userRegister = {
                username: 'username',
                email: 'user@mail.com',
                password: '1234'
            }
            return request(app)
                .post('/register')
                .send(userRegister)
                .set('Accept', 'application/json')
                .then(response => {
                    const { body, status } = response
                    expect(status).toBe(201)
                    expect(body).toHaveProperty('access_token')
                    done()
                })
                .catch((err) => {
                    done(err)
                })
        })
        test('400 Register failed empty username - should return json message', (done) => {
            const userRegister = {
                username: '',
                email: 'user@mail.com',
                password: '1234'
            }
            return request(app)
                .post('/register')
                .send(userRegister)
                .set('Accept', 'application/json')
                .then(response => {
                    const { body, status } = response
                    expect(status).toBe(400)
                    expect(body).toHaveProperty('message', 'username cannot be empty')
                    done()
                })
                .catch((err) => {
                    done(err)
                })
        })
        test('400 Register failed empty email - should return json message', (done) => {
            const userRegister = {
                username: 'username',
                email: '',
                password: '1234'
            }
            return request(app)
                .post('/register')
                .send(userRegister)
                .set('Accept', 'application/json')
                .then(response => {
                    const { body, status } = response
                    expect(status).toBe(400)
                    expect(body).toHaveProperty('message', 'email cannot be empty')
                    done()
                })
                .catch((err) => {
                    done(err)
                })
        })
        test('400 Register failed empty password - should return json message', (done) => {
            const userRegister = {
                username: 'username',
                email: 'user@mail.com',
                password: ''
            }
            return request(app)
                .post('/register')
                .send(userRegister)
                .set('Accept', 'application/json')
                .then(response => {
                    const { body, status } = response
                    expect(status).toBe(400)
                    expect(body).toHaveProperty('message', 'password cannot be empty')
                    done()
                })
                .catch((err) => {
                    done(err)
                })
        })
        test('409 Register failed duplicate email - should return json message', (done) => {
            const userRegister = {
                username: 'username',
                email: 'user@mail.com',
                password: '1234'
            }
            return request(app)
                .post('/register')
                .send(userRegister)
                .set('Accept', 'application/json')
                .then(response => {
                    // expect.fail()
                    const { body, status } = response
                    expect(status).toBe(409)
                    expect(body).toHaveProperty('message', "Email already registered!")
                    done()
                })
                .catch((err) => {
                    expect(err['name'].to.be.equal('SequelizeUniqueConstraintError:'))
                    done()
                })
        })
    })
    
})