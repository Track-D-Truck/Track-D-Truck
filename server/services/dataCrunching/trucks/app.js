'use strict'

const express = require ('express')
const app = express()
const router = require('./routes')
const PORT = process.env.PORT || 3001

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use('/movies', router)

app.listen(PORT , () => {
  console.log("FROM TRUCK TREUK, listening on port:", PORT)
})
