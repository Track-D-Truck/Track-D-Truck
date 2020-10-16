'use strict'

const TPS = require('../models')

class TPSController{
  static async getAll (req, res) {
    try {
      // console.log('HIT');
      const TPS = await TPS.getAll()
      return res.status(200).json(TPS)
    } catch (error) {
      console.log(error);
    }
  }

  static async getOne (req, res) {
    try {
      const TPS = await TPS.getOne(req.params.id)
      return res.status(200).json(TPS)
    } catch (error) {
      console.log(error);
    }
  }

  static async add (req, res) {
    try {
      const inputData = { ... req.body}
      const addedData = await TPS.addOne(inputData)
      return res.status(201).json(addedData.ops[0])
    } catch (error) {
      console.log(error);
    }
  }

  static async update( req, res) {
    try {
      const inputData = { ... req.body}
      const updatedData = await TPS.update(req.params.id, inputData)
      return res.status(200).json(updatedData.value)
    } catch (error) {
      console.log(error);
    }
  }

  static async delete (req, res) {
    try {
      const deleteData = await TPS.delete(req.params.id)
      return res.status(200).json(deleteData.value)
    } catch (error) {
      console.log(error);
    }
  }
  
}

module.exports = TPSController