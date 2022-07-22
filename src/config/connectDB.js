const mysql2 = require('mysql2/promise')
const configDb = require('./configDB')

let pool = null

async function connect() {
    try {
        pool = mysql2.createPool(configDb)
        pool.getConnection((err, connection)=>{
            if (err) throw err
        })

    } catch (error) {
        console.log('connectDb Failsed!!!');
        throw error
    }
}

connect()

module.exports = pool