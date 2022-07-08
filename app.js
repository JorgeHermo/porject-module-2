require("dotenv/config")
require("./db")

const express = require("express")
const app = express()

require("./config")(app)

app.locals.appTitle = 'ReciApi'

require('./config/session.config')(app)

require('./routes/index.routes')(app)
require("./error-handling")(app)

module.exports = app