const pool = require('../../config/connectDB')

 function exectQuery(sql ,value=[] ) {   
    return new Promise(async( result, reject)=>{
        try {
            const [rows,fields] = await pool.query(sql,value)
            result(rows)
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = exectQuery