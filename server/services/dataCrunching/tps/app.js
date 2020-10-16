'use strict'

const express = require ('express')
const app = express()
const router = require('./routes')
const PORT = process.env.PORT || 3001

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use('/tps', router)

app.listen(PORT , () => {
  console.log("FROM TPS TPS, listening on port:", PORT)
})
