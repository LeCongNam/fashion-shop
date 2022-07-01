const  express = require('express')
const morgan = require('morgan')
const app = express()
require('dotenv').config()
// Connect Database
require('./config/connectDB')

const Router = require('./routes')
const port = process.env.PORT || 3000

app.use(morgan('dev'))
app.use(express.json()); 
app.use(express.urlencoded({ extended: false }))


Router(app)

app.listen(port, () => {
    console.log(`Servere is running: 3000`);
})