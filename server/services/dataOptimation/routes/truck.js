const router = require(`express`).Router()
const TruckController = require(`../controllers/Trucks`)

router.get(`/`, TruckController.read)
router.post(`/`, TruckController.add)
router.get(`/:id`, TruckController.find)
router.put(`/:id`, TruckController.edit)
router.delete(`/:id`, TruckController.delete)


module.exports = router