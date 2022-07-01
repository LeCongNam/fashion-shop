const mysql2 = require('mysql2/promise')
const configDb = require('./configDB')

let pool 

async function connect() {
    try {
        pool =   mysql2.createPool(configDb)
        console.log('connectDb Successfully');
    } catch (error) {
        console.log('connectDb Failsed!!!');
        throw new Error(error)
    }
}

connect()

module.exports = pool