const poolQuery = require('../query/exect_query_sql')
const convert = require('../../helper/convert')

class User {
    async getAllUser() {
        let sql = 'select  * from user'
        let data = await poolQuery(sql, [1])
        return Promise.all(data)
    }

    async getSingleUser(userName, password) {
        console.log(userName, password);
        let sql = 'select  * from user where user_name like ? and password like ?'
        let data = await poolQuery(sql, [userName, password])
        let dataConvert = convert.convertArrayToObject(data)
        if (dataConvert) {
            return Promise.resolve(dataConvert)
        }
    }

    async register(data) {
        console.log(data)
        let sql = `insert into user(user_name,fullname, password, email, phone, address )  values (?,?, ?, ?, ?, ?)`
        let result = await poolQuery(sql, [
            data.user_name, 
            data.fullname, 
            data.password,
            data.email,
            data.phone,
            data.address,
        ])
        if (result.affected > 0) {
            return Promise.resolve(dataConvert)
        }
    }

    async getUserScretCode(userId){
        let sql = 'select  user_name, code from user where id= ?'
        const [row, field] = await poolQuery(sql, [userId])
        return Promise.all([row])
    }

}


module.exports = new User()