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
        console.log('masuk bsss');
        Driver.findAll({
            order: [['id', 'ASC']],
            where: {
                role: "driver"
              }
        })
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
            <p>Masuk dari Driver-d-Track</p>
            `
            const emailFrom = {
                from:process.env.EMAIL,
                to: `${result.email}`,
                subject:'Best regard from Driver-D-Track Teams',
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
                let {id, name, email, phone} = result
                let access_token = encode({id, name, email})
                res.status(200).json({access_token, name, id, phone, email})
            } else {
                throw error
            }
        })
        .catch(err => {
             console.log(err)
            next(err)
        })
    }

    static find(req, res, next) {
        let DriverId = req.params.id
        let error = {
            name: `otherError`,
            statusCode: 404,
            message: `Can't find the data.`
        }

        Driver.findByPk(DriverId)
        .then(result => {
            if(result) {
                // console.log(`ini result`, result)
                res.status(200).json(result)
            } else {
                throw error
            }
        })
        .catch(err => {
            next(err)
        })
    }

    static edit(req, res, next) {
        const editDriver = {
            status:req.body.status
        }
        
        let DriverId = +req.params.id
        console.log(editDriver,DriverId,' <<<<<<<<<<<<<<<<<<<<<<<<<<<');
        // Driver.update(editDriver, {where: {id: DriverId}, returning: true})
        // .then(result => {
        //     res.status(200).json(result )
        // })
        // .catch(err => {
        //     console.log(err, 'dari edit Driver');
        //     next(err)
        // })
    }

    static delete(req, res, next) {
        let DriverId = req.params.id
        let error = {
            name: `otherError`,
            statusCode: 404,
            message: `Can't find the data.`
        }
        let deletedData;
        // console.log(`ini di dalam delete`)
        Driver.findByPk(DriverId)
        .then(result => {
            if(!result) {
                throw error
            } else {
                deletedData = result
                return Driver.destroy({where: {id: DriverId}})
            }
        })
        .then(result => {
            // console.log(`ini result`, result)
            res.status(200).json({message: `Successfully delete Driver '${deletedData.name}'!`})
        })
        .catch(err => {
            next(err)
        })
    }
}   

module.exports = DriverController