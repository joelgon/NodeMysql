const express = require('express')
const server = express()
const db = require('./models')
const port = 3003
const bodyParser = require('body-parser')
const router = require('./routers/router')

server.use(bodyParser.urlencoded({extended: true}))
server.use(bodyParser.json())
server.use('/api', router)

db.sequelize.sync().then( () => {
    server.listen(port, () => {
        console.log(`Server is runnig on http://localhost:${port}`)
    })
})