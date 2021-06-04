const express = require('express')
const mongo = require('./mongo')
require('dotenv').config()
const cors = require('cors')
const cookieParser = require('cookie-parser')
const router = require('./route')

const app = express()
mongo()

app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended:false}))


app.use('/',cors({
    origin: ['http://localhost:3000'],
    credentials:true,
}), router)

const port = process.env.PORT

app.listen(port, () => console.log(`server is listening on port ${port}`))
