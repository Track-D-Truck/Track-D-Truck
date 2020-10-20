const OptimationRoutes = require('express').Router()
const OptimationController = require('../controllers/Optimations')

OptimationRoutes.get('/', (req, res, next) => {
    return res.status(200).json({message: "Hellow"})
})

OptimationRoutes.get('/test', OptimationController.test)


module.exports = OptimationRoutes