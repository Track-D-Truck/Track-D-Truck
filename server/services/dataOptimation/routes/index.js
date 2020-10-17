const router = require(`express`).Router()
const TruckRoutes = require(`./truck`)
const TPSRoutes = require(`./tps`)
//const {authentication, authorization} = require(`../middlewares/auth`)
const DriverController = require(`../controllers/Users`)


router.get('/', (req, res)=>{
    res.send('Terhubung kedalam Server TRUCK - D - TRACK')
})

router.post(`/register`, DriverController.register)
router.post(`/login`, DriverController.login)
//router.use(authentication)
//router.use(authorization)
router.use(`/trucks`, TruckRoutes)
router.use(`/tps`, TPSRoutes)

module.exports = router