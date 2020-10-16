'use strict'

const MongoClient = require('mongodb').MongoClient

const dbName = process.env.DB_URL || 'Track-D-Truck'
const url = process.env.dbName || 'mongodb://127.0.0.1:27017/'

const client = new MongoClient(url, {useUnifiedTopology: true})
client.connect()

const db = client.db(dbName)

module.exports = db