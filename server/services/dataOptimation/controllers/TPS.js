const {TPStorage} = require(`../models`)

class TPStorageController {

    static read(req, res, next) {
        TPStorage.findAll({order: [['createdAt', 'ASC']]})
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            next(err)
        })
    }

    static add(req, res, next) {
        const temp  = `${req.body.lat}. ${req.body.long}`
        const addTPStorage = {
            location:req.body.location,
            name:req.body.name,
            address:req.body.address,
            volume:req.body.volume,
            status:req.body.status
        }
        TPStorage.create(addTPStorage)
        .then(result => {
            res.status(201).json(result)
        })
        .catch(err => {
            console.log(`ini error di create`, err)
            next(err)
        })
    }

    static find(req, res, next) {
        let TPStorageId = req.params.id
        let error = {
            name: `otherError`,
            statusCode: 404,
            message: `Can't find the data.`
        }

        TPStorage.findByPk(TPStorageId)
        .then(result => {
            if(result) {
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
        const editTPStorage = {
            location: req.body.location, 
            name:req.body.name,
            address:req.body.address,
            volume:req.body.volume,
            status:req.body.status
         }

        let TPStorageId = req.params.id
        TPStorage.update(editTPStorage, {where: {id: TPStorageId}, returning: true})
        .then(result => {
            console.log(result);
            res.status(200).json(result )
        })
        .catch(err => {
            next(err)
        })
    }

    static delete(req, res, next) {
        let TPStorageId = req.params.id
        let error = {
            name: `otherError`,
            statusCode: 404,
            message: `Can't find the data.`
        }
        let deletedData;
        TPStorage.findByPk(TPStorageId)
        .then(result => {
            if(!result) {
                throw error
            } else {
                deletedData = result
                return TPStorage.destroy({where: {id: TPStorageId}})
            }
        })
        .then(result => {
            res.status(200).json({message: `Successfully delete TPStorage '${deletedData.TPStorage_code}'!`})
        })
        .catch(err => {
            next(err)
        })
    }
}

module.exports = TPStorageController