const {Driver} = require(`../models`)
const {comparePass} = require(`../helpers/bcrypt`)
const {encode} = require(`../helpers/jwt`)
const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    service:"gmail",
    port: 452,
    auth:{
        user:"praktikum.sig12019@gmail.com",
        pass: "Webebears@1945"
    }
})

class DriverController {

    static read(req, res, next) {
        Truck.findAll()
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            // console.log(err)
            next(err)
        })
    }

    static register(req, res, next) {
        const objUser = {
            name:req.body.name,
            email:req.body.email,
            password:req.body.password,
            phone:req.body.phone,
            role:req.body.role || 'Driver',
            status:req.body.status
        }                 
        Driver.create(objUser)
        .then(result => {
            const emailSend = `
            <p>Masuk dari Truck-d-Track</p>
            `
            const emailFrom = {
                from:process.env.EMAIL,
                to: `${result.email}`,
                subject:'Best regard from Truck-D-Track Teams',
                html: emailSend
            }
            
            return transporter.sendMail(emailFrom)
            .then(send =>{
            res.status(201).json(result)
        })
        })
        .catch(err => {
            console.log(err)
            next(err)
        })
    }

    static login(req, res, next) {
        const {email, password} = req.body
        const error = {
            name: `otherError`,
            statusCode: 400,
            message: `Invalid Email or Password, please check again!`
        }

        Driver.findOne({where: {email}})
        .then(result => {
            if (result && comparePass(password, result.password)) {
                let {id, name, email, role} = result
                let access_token = encode({id, name, email, role})
                res.status(200).json({access_token, name, id, status, role})
            } else {
                throw error
            }
        })
        .catch(err => {
             console.log(err)
            next(err)
        })
    }
}   

module.exports = DriverController