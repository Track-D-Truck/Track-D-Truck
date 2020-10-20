const {Driver} = require(`../models`)
const {decode} = require(`../helpers/jwt`)

const authentication = (req, res, next) => {
    let access_token = req.headers.access_token
    // console.log(access_token, `ini di auth`)
    let driverData = decode(access_token)
    req.driver = driverData
    Driver.findByPk(driverData.id)
    .then(result => {
        // console.log(result, `ini result di auth`)
        if (result) {
            next()
        }
    })
    .catch(err => {
        next(err)
    })
}

const authorization = (req, res, next) => {
    let error = {
        name: `otherError`,
        statusCode: 403,
        message: `You don't have access to this.`
    }
    let driverRole = req.driver.role
    if (driverRole === `admin`) {
        next()
    } else {
        throw error
    }
}

module.exports = {authentication, authorization}