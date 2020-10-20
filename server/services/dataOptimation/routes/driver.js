const DriverRoutes = require('express').Router()
const DriverController = require('../controllers/Users')

DriverRoutes.get(`/`, DriverController.read)
DriverRoutes.get(`/:id`, DriverController.find)
DriverRoutes.put(`/:id`, DriverController.edit)
DriverRoutes.delete(`/:id`, DriverController.delete)


module.exports = DriverRoutes