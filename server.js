const http = require('http')
const fs = require('fs')
const app = require('./app.js')

const server = http.createServer(app)

server.listen(8080)
