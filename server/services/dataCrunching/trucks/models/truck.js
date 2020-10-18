'use strict'

const db = require('../configs')
const { ObjectId } = require('mongodb')
const Truck = db.collection("Trucks") 

class MoviesModel {
  static getAll() {
    try {
      return Truck.find().toArray()
    } catch (error) {
      console.log(error); 
    }
  }
  
  static getOne(id) {
    try {
      return Truck.findOne({ "_id": ObjectId(id)})
    } catch (error) {
      console.log(error);
    }
  }

  static addOne(inputData) {
    try {
      return Truck.insertOne(inputData)
    } catch (error) {
      console.log(error);
    }
  }

  static async update(id, inputData) {
    try {
      return Truck.findOneAndUpdate(
        {"_id": ObjectId(id)}, 
        { $set: inputData},
        {returnOriginal: false})
    } catch (error) {
      console.log(error);
    }
  }

  static async delete(id) {
    try {
      console.log(id);
      return Truck.findOneAndDelete({ "_id": ObjectId(id) })
    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = MoviesModel