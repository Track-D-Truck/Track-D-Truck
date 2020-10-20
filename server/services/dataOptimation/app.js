// if(process.env.NODE_ENV === 'development'){
//     require('dotenv').config()
// }

const cors = require(`cors`)
const express = require(`express`)
const routes = require(`./routes`)
const errorHandler = require(`./middlewares/errHandler`)
const app = express()
const port = process.env.PORT || 3000


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(routes)
app.use(errorHandler)

const server = require("http").createServer(app)
const io = require("socket.io").listen(server)

io.on("connection", socket => {
    console.log("a use connected");
    socket.on("CURRENT_COORDINATE", chat => {
        console.log(chat);
        io.emit("CURRENT_COORDINATE", chat)
    })
})

server.listen(port, () => {
    console.log(`We are open now at ${port} SEMANGAT TZUY INI SERVER CRUD`)
 })

// module.exports = app

//socket io
const server = require("http").createServer(app)
const io = require("socket.io").listen(server)

io.on("connection", socket => {
    console.log("a user connected");
    socket.on("SET_COORDINATE", coordinate => {
        console.log(coordinate);
        io.emit("SET_COORDINATE", coordinate)
    })
})

server.listen(port, () => {
    console.log(`We are open now at ${port} SEMANGAT TZUY INI SERVER CRUD`)
})

module.exports = app