const express = require('express')
const app = express()
const path = require('path')

const api = require('./server/routes/api')

const axios = require('axios').default

app.use(express.static(path.join(__dirname, 'dist')))
app.use(express.static(path.join(__dirname, 'node_modules')))
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/', api)

const PORT = 8080
app.listen(PORT, () => {
    console.log(`running on port ${PORT}`)
}) 



