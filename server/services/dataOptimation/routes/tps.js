const router = require(`express`).Router()
const TPSController = require(`../controllers/TPS`)

router.get(`/`, TPSController.read)
router.post(`/`, TPSController.add)
router.get(`/:id`, TPSController.find)
router.put(`/:id`, TPSController.edit)
router.delete(`/:id`, TPSController.delete)


module.exports = router