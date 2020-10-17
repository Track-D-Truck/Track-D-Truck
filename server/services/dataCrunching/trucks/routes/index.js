'use strict'

const router = require('express').Router()
const TruckController = require('../controllers/TruckController.js')

router.post('/', TruckController.add)
router.get('/', TruckController.getAll)
router.get('/:id', TruckController.getOne)
router.put('/:id', TruckController.update)
router.delete('/:id', TruckController.delete)

module.exports = router