'use strict'

const router = require('express').Router()
const TPSController = require('../controllers/TPSController.js')

router.post('/', TPSController.add)
router.get('/', TPSController.getAll)
router.get('/:id', TPSController.getOne)
router.put('/:id', TPSController.update)
router.delete('/:id', TPSController.delete)

module.exports = router