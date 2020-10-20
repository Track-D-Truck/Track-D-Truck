const request = require('supertest')
const app = require(`../app`)
const {sequelize} = require(`../models`)
const {User, tps} = require(`../models`)
const {encode} = require(`../helpers/jwt`)
const {queryInterface} = sequelize

let access_token = ``
let tokenLain = ``
let tpsId = ``

let newtps = {
    location: "-6.133.123, 113.123.11",
    name: "TOS",
    address: "Jalan Raya Pokoknya",
    volume: 91,
    status: "Available"
}

let editedtps = {
    location: "-6.133.123",
    name: "TOS",
    address: "Jalan Raya Pokoknya",
    volume: 91,
    status: "Available"
}

beforeAll((done) => {
    
    let user = {
        name: `admin`,
        email: `admin@email.com`,
        phone: "0812315",
        password: `12345`,
        role: `admin`,
        status: 'Available'
    }

    let user2 = {
        name: `admin`,
        email: `admin2@email.com`,
        phone: '081123665',
        password: `12345`,
        role: `Driver`,
        status: 'Available'
    }


    User.create(user) 
    .then(result => {
        // console.log(result)
        let {id, name, email, phone, role} = result
        access_token = encode({id, name, phone, email, role})
        // console.log(access_token, `ini access token`)
        return User.create(user2)
    })
    .then(result => {
        let {id, name, email, phone, role} = result
        tokenLain = encode({id, name, email,phone, role})
        // console.log(access_token, `ini access token`)
        return tps.create(newtps)
    }) 
    .then(result => {
        tpsId = result.id
        done()
    })
    .catch(err => {
        // console.log(err)
        done(err)
    })
})

afterAll( async (done) => {
    try {
        await queryInterface.bulkDelete(`tps`, {})
        await queryInterface.bulkDelete(`Drivers`, {})
        done()
    } catch(err) {
        done(err)
    }
});

describe(`tps routes`, () => {
    describe(`GET /tps`, () => {
        
        test("401:failed to pass auth, return json with error", (done) => {
            request(app)
            .get('/tps')
            .set(`access_token`, ``)
            .then(result => {
                const {status, body} = result
                expect(status).toBe(401)
                expect(body.message).toEqual(expect.stringContaining(`Please login to access this page.`))
                done()
            })
            .catch(err => done(err))
        })
        
        test("403:role is not admin, return json with error", (done) => {
            request(app)
            .get('/tps')
            .set(`access_token`, tokenLain)
            .then(result => {
                const {status, body} = result
                expect(status).toBe(403)
                expect(body.message).toEqual(expect.stringContaining(`You don't have access to this.`))
                done()
            })
            .catch(err => done(err))
        })


        test("200:OK, return json with all tps data", (done) => {
            // console.log(access_token, `ini access_token di describe`)
            request(app)
            .get('/tps')
            .set(`access_token`, access_token)
            .then(result => {
                // console.log(result, `ini result`)
                const {status, body} = result
                expect(status).toBe(200)
                expect(body).toEqual(expect.any(Array))
                // console.log(`ini sebelum done`)
                done()
            })
            .catch(err => done(err))
        })
    })
    
    describe(`POST /tps`, () => {
        
        let tpsAdd = {
            location: "-6.133.123, 113.123.11",
            name: "TOS",
            address: "Jalan Raya Pokoknya",
            volume: 91,
            status: "Available"
        }

        test("401:failed to pass auth, return json with error", (done) => {
            request(app)
            .post('/tps')
            .send(tpsAdd)
            .set(`access_token`, ``)
            .then(result => {
                const {status, body} = result
                expect(status).toBe(401)
                expect(body.message).toEqual(expect.stringContaining(`Please login to access this page.`))
                done()
            })
            .catch(err => done(err))
        })
        
        test("403:role is not admin, return json with error", (done) => {
            request(app)
            .post('/tps')
            .send(tpsAdd)
            .set(`access_token`, tokenLain)
            .then(result => {
                const {status, body} = result
                expect(status).toBe(403)
                expect(body.message).toEqual(expect.stringContaining(`You don't have access to this.`))
                done()
            })
            .catch(err => done(err))
        })

        test("201:created, return json with tps's data", (done) => {
            request(app)
            .post('/tps')
            .send(tpsAdd)
            .set(`access_token`, access_token)
            .then(result => {
                const {status, body} = result
                expect(status).toBe(201)
                expect(body).toHaveProperty(`id`, expect.any(Number))
                expect(body).toHaveProperty(`name`, tpsAdd.name)
                expect(body).toHaveProperty(`location`, tpsAdd.location)
                expect(body).toHaveProperty(`address`, tpsAdd.address)
                expect(body).toHaveProperty(`volume`, tpsAdd.volume)
                expect(body).toHaveProperty(`status`, tpsAdd.status)
                expect(body).toHaveProperty(`createdAt`, expect.anything())
                expect(body).toHaveProperty(`updatedAt`, expect.anything())
                done()
            })
            .catch(err => done(err))
        })

        let nullResult = [
            `Code is required.`,
            `Location is required.`,
            `Status is required.`,
            `Cost must be in number format!`,
            `Capacity must be in number format!`
        ]

        let emptyResult = [
            `Code must be filled!`,
            `Cost must be provided!`,
            `Capacity must be in URL format!`,
            `Status must be provided!`
        ]

        let zeroValue = [
            `Capacity must be more than zero!`,
            `Cost can't be less than zero!`
        ]

        let testtpsEmpty = {
        location: "",
        name: "",
        address: "",
        volume: '',
        status: ""
        }

        let testtpsZero = {
        location: "",
        name: "",
        address: "",
        volume: 0,
        status: ""
        }


        test("400:validation errors (empty fields), return json with error", (done) => {
            request(app)
            .post('/tps')
            .send(testtpsEmpty)
            .set(`access_token`, access_token)
            .then(result => {
                // console.log(result)
                const {status, body} = result
                expect(status).toBe(400)
                expect(body.message).toEqual(expect.arrayContaining(emptyResult))
                done()
            })
            .catch(err => done(err))
        })

        test("400:validation errors (no data), return json with error", (done) => {
            request(app)
            .post('/tps')
            .send()
             .set(`access_token`, access_token)
            .then(result => {
                // console.log(result)
                const {status, body} = result
                expect(status).toBe(400)
                expect(body.message).toEqual(expect.arrayContaining(nullResult))
                done()
            })
            .catch(err => done(err))
        })

        test("400:validation errors (zero value), return json with error", (done) => {
            request(app)
            .post('/tps')
            .send(testtpsZero)
             .set(`access_token`, access_token)
            .then(result => {
                // console.log(result)
                const {status, body} = result
                expect(status).toBe(400)
                expect(body.message).toEqual(expect.arrayContaining(zeroValue))
                done()
            })
            .catch(err => done(err))
        })

    })
    
    describe(`GET /tps/:id`, () => {
        
        test("401:failed to pass auth, return json with error", (done) => {
            request(app)
            .get(`/tps/${tpsId}`)
            .set(`access_token`, ``)
            .then(result => {
                const {status, body} = result
                expect(status).toBe(401)
                expect(body.message).toEqual(expect.stringContaining(`Please login to access this page.`))
                done()
            })
            .catch(err => done(err))
        })
        
        test("403:role is not admin, return json with error", (done) => {
            request(app)
            .get(`/tps/${tpsId}`)
            .set(`access_token`, tokenLain)
            .then(result => {
                const {status, body} = result
                expect(status).toBe(403)
                expect(body.message).toEqual(expect.stringContaining(`You don't have access to this.`))
                done()
            })
            .catch(err => done(err))
        })

        test("404:data not found, return json with error", (done) => {
            request(app)
            .get(`/tps/0`)
            .set(`access_token`, access_token)
            .then(result => {
                const {status, body} = result
                expect(status).toBe(404)
                expect(body.message).toEqual(expect.stringContaining(`Can't find the data.`))
                done()
            })
            .catch(err => done(err))
        })

        test("200:OK, return json with tps's data", (done) => {
            // console.log(access_token, `ini access_token di describe`)
            request(app)
            .get(`/tps/${tpsId}`)
            .set(`access_token`, access_token)
            .then(result => {
                // console.log(result, `ini result`)
                const {status, body} = result
                expect(status).toBe(200)
                expect(body).toHaveProperty(`id`, expect.any(Number))
                expect(body).toHaveProperty(`name`, newtps.name)
                expect(body).toHaveProperty(`address`, newtps.address)
                expect(body).toHaveProperty(`location`, newtps.location)
                expect(body).toHaveProperty(`volume`, newtps.volume)
                expect(body).toHaveProperty(`status`, newtps.status)
                expect(body).toHaveProperty(`createdAt`, expect.anything())
                expect(body).toHaveProperty(`updatedAt`, expect.anything())
                done()
            })
            .catch(err => done(err))
        })
    })

    describe(`PUT /tps/:id`, () => {
        test("401:failed to pass auth, return json with error", (done) => {
            request(app)
            .put(`/tps/${tpsId}`)
            .send(editedtps)
            .set(`access_token`, ``)
            .then(result => {
                const {status, body} = result
                expect(status).toBe(401)
                expect(body.message).toEqual(expect.stringContaining(`Please login to access this page.`))
                done()
            })
            .catch(err => done(err))
        })
        
        test("403:role is not admin, return json with error", (done) => {
            request(app)
            .put(`/tps/${tpsId}`)
            .send(editedtps)
            .set(`access_token`, tokenLain)
            .then(result => {
                const {status, body} = result
                expect(status).toBe(403)
                expect(body.message).toEqual(expect.stringContaining(`You don't have access to this.`))
                done()
            })
            .catch(err => done(err))
        })

        test("200:OK, return json with tps's data", (done) => {
            // console.log(access_token, `ini access_token di describe`)
            request(app)
            .put(`/tps/${tpsId}`)
            .send(editedtps)
            .set(`access_token`, access_token)
            .then(result => {
                // console.log(result, `ini result`)
                const {status, body} = result
                expect(status).toBe(200)
                expect(body).toHaveProperty(`id`, expect.any(Number))
                expect(body).toHaveProperty(`name`, newtps.name)
                expect(body).toHaveProperty(`address`, newtps.address)
                expect(body).toHaveProperty(`location`, newtps.location)
                expect(body).toHaveProperty(`volume`, newtps.volume)
                expect(body).toHaveProperty(`status`, newtps.status)
                expect(body).toHaveProperty(`createdAt`, expect.anything())
                expect(body).toHaveProperty(`updatedAt`, expect.anything())
                done()
            })
            .catch(err => done(err))
        })

        let emptyResult = [
            `Code tps must be filled!`,
            `Location must be provided!`
        ]

        let zeroValue = [
            `Capcity must be more than zero!`,
            `Cost can't be less than zero!`
        ]

        let testtpsEmpty = {
            location: "",
            name: "",
            address: "",
            volume: "",
            status: ""
        }

        let testtpsZero = {
        location: "",
        name: "",
        address: "",
        volume: 0,
        status: ""
        }


        test("400:validation errors (empty fields), return json with error", (done) => {
            request(app)
            .put(`/tps/${tpsId}`)
            .send(testtpsEmpty)
            .set(`access_token`, access_token)
            .then(result => {
                // console.log(result)
                const {status, body} = result
                expect(status).toBe(400)
                expect(body.message).toEqual(expect.arrayContaining(emptyResult))
                done()
            })
            .catch(err => done(err))
        })


        test("400:validation errors (zero value), return json with error", (done) => {
            request(app)
            .put(`/tps/${tpsId}`)
            .send(testtpsZero)
             .set(`access_token`, access_token)
            .then(result => {
                // console.log(result)
                const {status, body} = result
                expect(status).toBe(400)
                expect(body.message).toEqual(expect.arrayContaining(zeroValue))
                done()
            })
            .catch(err => done(err))
        })
    })

    describe(`DELETE /tps/:id`, () => {

        test("401:failed to pass auth, return json with error", (done) => {
            request(app)
            .delete(`/tps/${tpsId}`)
            .set(`access_token`, ``)
            .then(result => {
                const {status, body} = result
                expect(status).toBe(401)
                expect(body.message).toEqual(expect.stringContaining(`Please login to access this page.`))
                done()
            })
            .catch(err => done(err))
        })
        
        test("403:role is not admin, return json with error", (done) => {
            request(app)
            .delete(`/tps/${tpsId}`)
            .set(`access_token`, tokenLain) 
            .then(result => {
                const {status, body} = result
                expect(status).toBe(403)
                expect(body.message).toEqual(expect.stringContaining(`You don't have access to this.`))
                done()
            })
            .catch(err => done(err))
        })

        test("404:data not found, return json with error", (done) => {
            request(app)
            .delete(`/tps/0`)
            .set(`access_token`, access_token)
            .then(result => {
                const {status, body} = result
                expect(status).toBe(404)
                expect(body.message).toEqual(expect.stringContaining(`Can't find the data.`))
                done()
            })
            .catch(err => done(err))
        })

        test("200:OK, return json with tps's data", (done) => {
            // console.log(access_token, `ini access_token di describe`)
            request(app)
            .delete(`/tps/${tpsId}`)
            .set(`access_token`, access_token)
            .then(result => {
                // console.log(result, `ini result`)
                const {status, body} = result
                expect(status).toBe(200)
                expect(body.message).toEqual(expect.stringContaining(`Successfully delete tps '${editedtps.name}'!`))
                done()
            })
            .catch(err => done(err))
        })
    })

})