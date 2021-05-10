const http = require('http')
const fs = require('fs')
const app = require('./app.js')

const server = http.createServer(app)

server.listen(process.env.PORT || 8080)
