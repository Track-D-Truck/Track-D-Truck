const {Truck, Driver} = require(`../models`)

class TruckController {

    static read(req, res, next) {
        Truck.findAll({
            include: [Driver],
            order: [['id', 'ASC']]})
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            next(err)
        })
    }

    static add(req, res, next) {
        const addTruck = {
            truck_code: req.body.truck_code, 
            capacity: req.body.capacity,
            location: "-6.891205299999999, 107.6266582",
            cost: +req.body.cost,
            status: req.body.status
        }
        Truck.create(addTruck)
        .then(result => {
            // console.log(`ini result`, result
            res.status(201).json(result)
        })
        .catch(err => {
            console.log(`ini error di create`, err)
            next(err)
        })
    }

    static find(req, res, next) {
        let TruckId = req.params.id
        let error = {
            name: `otherError`,
            statusCode: 404,
            message: `Can't find the data.`
        }

        Truck.findByPk(TruckId)
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
        console.log(req.body,'<<<<<<<<<<<<<ini di controller');
        const editTruck = {
            truck_code: req.body.truck_code, 
            capacity: req.body.capacity,
            location: req.body.location,
            cost: +req.body.cost,
            status: req.body.status,
            DriverId: req.body.DriverId        
        }

        let TruckId = +req.params.id
        // console.log(TruckId,editTruck,'<<<<<<<<<<<<<<<<<<<<<<<<');
        Truck.update(editTruck, {where: {id: TruckId}, returning: true})
        .then(result => {
            console.log(result);
            res.status(200).json(result )
        })
        .catch(err => {
            console.log(err, 'dari edit Truck');
            next(err)
        })
    }

    static delete(req, res, next) {
        let TruckId = req.params.id
        let error = {
            name: `otherError`,
            statusCode: 404,
            message: `Can't find the data.`
        }
        let deletedData;
        // console.log(`ini di dalam delete`)
        Truck.findByPk(TruckId)
        .then(result => {
            if(!result) {
                throw error
            } else {
                deletedData = result
                return Truck.destroy({where: {id: TruckId}})
            }
        })
        .then(result => {
            // console.log(`ini result`, result)
            res.status(200).json({message: `Successfully delete Truck '${deletedData.truck_code}'!`})
        })
        .catch(err => {
            next(err)
        })
    }
}

module.exports = TruckController