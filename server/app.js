const express = require('express')
const mongo = require('./mongo')
require('dotenv').config()
const cors = require('cors')
const router = require('./route')

const app = express()
mongo()

app.use(express.json())
app.use(express.urlencoded({extended:false}))


app.use('/',cors(), router)

const port = process.env.PORT

app.listen(port, () => console.log(`server is listening on port ${port}`))
