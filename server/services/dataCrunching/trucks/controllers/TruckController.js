'use strict'

const Truck = require('../models')

class TrucksController{
  static async getAll (req, res) {
    try {
      // console.log('HIT');
      const Trucks = await Truck.getAll()
      return res.status(200).json(Trucks)
    } catch (error) {
      console.log(error);
    }
  }

  static async getOne (req, res) {
    try {
      const Trucks = await Truck.getOne(req.params.id)
      return res.status(200).json(Trucks)
    } catch (error) {
      console.log(error);
    }
  }

  static async add (req, res) {
    try {
      const inputData = { ... req.body}
      const addedData = await Truck.addOne(inputData)
      return res.status(201).json(addedData.ops[0])
    } catch (error) {
      console.log(error);
    }
  }

  static async update( req, res) {
    try {
      const inputData = { ... req.body}
      const updatedData = await Truck.update(req.params.id, inputData)
      return res.status(200).json(updatedData.value)
    } catch (error) {
      console.log(error);
    }
  }

  static async delete (req, res) {
    try {
      const deleteData = await Truck.delete(req.params.id)
      return res.status(200).json(deleteData.value)
    } catch (error) {
      console.log(error);
    }
  }
  
}

module.exports = TrucksController