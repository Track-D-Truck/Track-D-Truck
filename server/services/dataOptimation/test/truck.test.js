const request = require('supertest')
const app = require(`../app`)
const {sequelize} = require(`../models`)
const {Driver, Truck} = require(`../models`)
const {encode} = require(`../helpers/jwt`)
const {queryInterface} = sequelize

let access_token = ''
let tokenLain = ``
let TruckId = ``

let newTruck = {
    truck_code: "Truck1",
    capacity: 90,
    cost: 123000,
    status: "Available",
    location: "-6.233.12, 126.120.11",
}

let editedTruck = {
    truck_code: "Truck5",
    capacity: 10,
    cost: 1100,
    status: "Available",
    location: "-6.242.12, 126.120.11",
    DriverId: 1
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
        name: `admin1`,
        email: `admin2@email.com`,
        phone: '081123665',
        password: `12345`,
        role: `driver`,
        status: 'Available'
    }


    Driver.create(user) 
    .then(result => {
        // console.log(result)
        let {id, name, email, phone, role} = result
        access_token = encode({id, name, phone, email, role})
        // console.log(access_token, `ini access token`)
        return Driver.create(user2)
    })
    .then(result => {
        let {id, name, email, phone, role} = result
        tokenLain = encode({id, name, email,phone, role})
        // console.log(access_token, `ini access token`)
        return Truck.create(newTruck)
    }) 
    .then(result => {
        TruckId = result.id
        done()
    })
    .catch(err => {
        // console.log(err)
        done(err)
    })
})

afterAll( async (done) => {
    try {
        await queryInterface.bulkDelete(`Trucks`, {})
        await queryInterface.bulkDelete(`Drivers`, {})
        done()
    } catch(err) {
        done(err)
    }
});

describe(`Truck routes`, () => {
    describe(`GET /trucks`, () => {
        
        test("401:failed to pass auth, return json with error", (done) => {
            request(app)
            .get('/trucks')
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
            .get('/trucks')
            .set(`access_token`, tokenLain)
            .then(result => {
                const {status, body} = result
                expect(status).toBe(403)
                expect(body.message).toEqual(expect.stringContaining(`You don't have access to this.`))
                done()
            })
            .catch(err => done(err))
        })


        test("200:OK, return json with all Trucks data", (done) => {
            // console.log(access_token, `ini access_token di describe`)
            request(app)
            .get('/trucks')
            .set(`access_token`, access_token)
            .then(result => {
                console.log(result)
                console.log('<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<,');
                const {status, body} = result
                expect(status).toBe(200)
                expect(body).toEqual(expect.any(Array))
                // console.log(`ini sebelum done`)
                done()
            })
            .catch(err => done(err))
        })
    })
    
    describe(`POST /trucks`, () => {
        
        let TruckAdd = {
            truck_code: "TruckO",
            capacity: 90,
            cost: 30000,
            status: "Available",
            location: '-7.922.312, 127.223.129',
        }

        // test("401:failed to pass auth, return json with error", (done) => {
        //     request(app)
        //     .post('/trucks')
        //     .send(TruckAdd)
        //     .set(`access_token`, ``)
        //     .then(result => {
        //         const {status, body} = result
        //         expect(status).toBe(401)
        //         expect(body.message).toEqual(expect.stringContaining(`Please login to access this page.`))
        //         done()
        //     })
        //     .catch(err => done(err))
        // })
        
        test("403:role is not admin, return json with error", (done) => {
            request(app)
            .post('/trucks')
            .send(TruckAdd)
            .set(`access_token`, tokenLain)
            .then(result => {
                const {status, body} = result
                expect(status).toBe(403)
                expect(body.message).toEqual(expect.stringContaining(`You don't have access to this.`))
                done()
            })
            .catch(err => done(err))
        })

        test("201:created, return json with Truck's data", (done) => {
            request(app)
            .post('/trucks')
            .send(TruckAdd)
            .then(result => {
                console.log('<><><><><><><><><><><><><><><><><><><>');
                console.log(result);
                const {status, body} = result
                expect(status).toBe(201)
                expect(body).toHaveProperty(`id`, expect.any(Number))
                expect(body).toHaveProperty(`truck_code`, TruckAdd.truck_code)
                expect(body).toHaveProperty(`cost`, TruckAdd.cost)
                expect(body).toHaveProperty(`location`, TruckAdd.location)
                expect(body).toHaveProperty(`capacity`, TruckAdd.capacity)
                expect(body).toHaveProperty(`status`, TruckAdd.status)
               // expect(body).toHaveProperty(`DriverId`, TruckAdd.DriverId)
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

        let testTruckEmpty = {
            truck_code: "",
            capacity: "",
            cost: "",
            status: "",
            location: "",
        }

        let testTruckZero = {
            truck_code: "",
            capacity: 0,
            cost: 0,
            status: "",
            location: "",
        }


        test("400:validation errors (empty fields), return json with error", (done) => {
            request(app)
            .post('/trucks')
            .send(testTruckEmpty)
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
            .post('/trucks')
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
            .post('/trucks')
            .send(testTruckZero)
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
})
    
//     describe(`GET /trucks/:id`, () => {
        
//         test("401:failed to pass auth, return json with error", (done) => {
//             request(app)
//             .get(`/trucks/${TruckId}`)
//             .set(`access_token`, ``)
//             .then(result => {
//                 const {status, body} = result
//                 expect(status).toBe(401)
//                 expect(body.message).toEqual(expect.stringContaining(`Please login to access this page.`))
//                 done()
//             })
//             .catch(err => done(err))
//         })
        
//         test("403:role is not admin, return json with error", (done) => {
//             request(app)
//             .get(`/trucks/${TruckId}`)
//             .set(`access_token`, tokenLain)
//             .then(result => {
//                 const {status, body} = result
//                 expect(status).toBe(403)
//                 expect(body.message).toEqual(expect.stringContaining(`You don't have access to this.`))
//                 done()
//             })
//             .catch(err => done(err))
//         })

//         test("404:data not found, return json with error", (done) => {
//             request(app)
//             .get(`/trucks/0`)
//             .set(`access_token`, access_token)
//             .then(result => {
//                 const {status, body} = result
//                 expect(status).toBe(404)
//                 expect(body.message).toEqual(expect.stringContaining(`Can't find the data.`))
//                 done()
//             })
//             .catch(err => done(err))
//         })

//         test("200:OK, return json with Truck's data", (done) => {
//             // console.log(access_token, `ini access_token di describe`)
//             request(app)
//             .get(`/trucks/${TruckId}`)
//             .set(`access_token`, access_token)
//             .then(result => {
//                 // console.log(result, `ini result`)
//                 const {status, body} = result
//                 expect(status).toBe(200)
//                 expect(body).toHaveProperty(`id`, expect.any(Number))
//                 expect(body).toHaveProperty(`truck_code`, newTruck.truck_code)
//                 expect(body).toHaveProperty(`cost`, newTruck.cost)
//                 expect(body).toHaveProperty(`location`, newTruck.location)
//                 expect(body).toHaveProperty(`capacity`, newTruck.capacity)
//                 expect(body).toHaveProperty(`status`, newTruck.status)
//                 expect(body).toHaveProperty(`createdAt`, expect.anything())
//                 expect(body).toHaveProperty(`updatedAt`, expect.anything())
//                 done()
//             })
//             .catch(err => done(err))
//         })
//     })

//     describe(`PUT /trucks/:id`, () => {
//         test("401:failed to pass auth, return json with error", (done) => {
//             request(app)
//             .put(`/trucks/${TruckId}`)
//             .send(editedTruck)
//             .set(`access_token`, ``)
//             .then(result => {
//                 const {status, body} = result
//                 expect(status).toBe(401)
//                 expect(body.message).toEqual(expect.stringContaining(`Please login to access this page.`))
//                 done()
//             })
//             .catch(err => done(err))
//         })
        
//         test("403:role is not admin, return json with error", (done) => {
//             request(app)
//             .put(`/trucks/${TruckId}`)
//             .send(editedTruck)
//             .set(`access_token`, tokenLain)
//             .then(result => {
//                 const {status, body} = result
//                 expect(status).toBe(403)
//                 expect(body.message).toEqual(expect.stringContaining(`You don't have access to this.`))
//                 done()
//             })
//             .catch(err => done(err))
//         })

//         test("200:OK, return json with Truck's data", (done) => {
//             // console.log(access_token, `ini access_token di describe`)
//             request(app)
//             .put(`/trucks/${TruckId}`)
//             .send(editedTruck)
//             .set(`access_token`, access_token)
//             .then(result => {
//                 // console.log(result, `ini result`)
//                 const {status, body} = result
//                 expect(status).toBe(200)
//                 expect(body).toHaveProperty(`id`, expect.any(Number))
//                 expect(body).toHaveProperty(`truck_code`, TruckAdd.truck_code)
//                 expect(body).toHaveProperty(`cost`, TruckAdd.cost)
//                 expect(body).toHaveProperty(`location`, TruckAdd.location)
//                 expect(body).toHaveProperty(`capacity`, TruckAdd.capacity)
//                 expect(body).toHaveProperty(`status`, TruckAdd.status)
//                 expect(body).toHaveProperty(`createdAt`, expect.anything())
//                 expect(body).toHaveProperty(`updatedAt`, expect.anything())
//                 done()
//             })
//             .catch(err => done(err))
//         })

//         let emptyResult = [
//             `Code truck must be filled!`,
//             `Location must be provided!`
//         ]

//         let zeroValue = [
//             `Capcity must be more than zero!`,
//             `Cost can't be less than zero!`
//         ]

//         let testTruckEmpty = {
//             truck_code: "",
//             capacity: "",
//             cost: "",
//             status: "",
//             location: "",
//         }

//         let testTruckZero = {
//             truck_code: "",
//             capacity: 0,
//             cost: -1,
//             status: "",
//             location: "",
//         }


//         // test("400:validation errors (empty fields), return json with error", (done) => {
//         //     request(app)
//         //     .put(`/trucks/${TruckId}`)
//         //     .send(testTruckEmpty)
//         //     .set(`access_token`, access_token)
//         //     .then(result => {
//         //         // console.log(result)
//         //         const {status, body} = result
//         //         expect(status).toBe(400)
//         //         expect(body.message).toEqual(expect.arrayContaining(emptyResult))
//         //         done()
//         //     })
//         //     .catch(err => done(err))
//         // })


//         // test("400:validation errors (zero value), return json with error", (done) => {
//         //     request(app)
//         //     .put(`/trucks/${TruckId}`)
//         //     .send(testTruckZero)
//         //      .set(`access_token`, access_token)
//         //     .then(result => {
//         //         // console.log(result)
//         //         const {status, body} = result
//         //         expect(status).toBe(400)
//         //         expect(body.message).toEqual(expect.arrayContaining(zeroValue))
//         //         done()
//         //     })
//         //     .catch(err => done(err))
//         // })
//     })

//     describe(`DELETE /trucks/:id`, () => {

//         test("401:failed to pass auth, return json with error", (done) => {
//             request(app)
//             .delete(`/trucks/${TruckId}`)
//             .set(`access_token`, ``)
//             .then(result => {
//                 const {status, body} = result
//                 expect(status).toBe(401)
//                 expect(body.message).toEqual(expect.stringContaining(`Please login to access this page.`))
//                 done()
//             })
//             .catch(err => done(err))
//         })
        
//         test("403:role is not admin, return json with error", (done) => {
//             request(app)
//             .delete(`/trucks/${TruckId}`)
//             .set(`access_token`, tokenLain) 
//             .then(result => {
//                 const {status, body} = result
//                 expect(status).toBe(403)
//                 expect(body.message).toEqual(expect.stringContaining(`You don't have access to this.`))
//                 done()
//             })
//             .catch(err => done(err))
//         })

//         test("404:data not found, return json with error", (done) => {
//             request(app)
//             .delete(`/trucks/0`)
//             .set(`access_token`, access_token)
//             .then(result => {
//                 const {status, body} = result
//                 expect(status).toBe(404)
//                 expect(body.message).toEqual(expect.stringContaining(`Can't find the data.`))
//                 done()
//             })
//             .catch(err => done(err))
//         })

//         test("200:OK, return json with Truck's data", (done) => {
//             // console.log(access_token, `ini access_token di describe`)
//             request(app)
//             .delete(`/trucks/${TruckId}`)
//             .set(`access_token`, access_token)
//             .then(result => {
//                 // console.log(result, `ini result`)
//                 const {status, body} = result
//                 expect(status).toBe(200)
//                 expect(body.message).toEqual(expect.stringContaining(`Successfully delete Truck '${editedTruck.name}'!`))
//                 done()
//             })
//             .catch(err => done(err))
//         })
//     })

// })