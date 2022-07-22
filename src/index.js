const express = require('express')
const morgan = require('morgan')
const app = express()
require('dotenv').config()
require('./config/connectDB')

const session = require("express-session")
let RedisStore = require("connect-redis")(session)
const Redis = require("ioredis")
let redisClient = new Redis()

const Router = require('./routes')
const port = process.env.PORT || 3000

app.use(morgan('dev'))
app.use(express.json());
app.use(express.urlencoded({ extended: false }))

// Session
app.use(
    session({
        store: new RedisStore({ client: redisClient }),
        secret: process.env.SECRET_SESSION,
        resave: false,
        saveUninitialized: true,
        cookie:{
            httpOnly: true,
            secure: true
        }
    })
)



Router(app)


app.listen(port, () => {
    console.log(`Servere is running: 3000`);
})