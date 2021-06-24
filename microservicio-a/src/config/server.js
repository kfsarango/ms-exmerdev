const express = require('express')
const cors = require('cors')

const app = express()
// config
app.set('port', process.env.PORT | 3000)

app.use(cors())
app.use(express.urlencoded({extended: false}));
app.use(express.json())
app.use('/api', require('../routes'))

module.exports = app