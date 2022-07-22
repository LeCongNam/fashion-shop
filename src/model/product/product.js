const poolQuery = require('../query/exect_query_sql')
const convert = require('../../helper/convert')
const bcrypt = require('bcrypt');


class Product {
    async getProductByPage(page) {
        if(!page) return Promise.reject(false)
        let limit = 10
        let start = (page - 1) * limit
        let sql = 'SELECT * FROM booking_care.food limit ? offset ?'
        let data = await poolQuery(sql, [limit, start])
        return Promise.all(data)
       
    }

    async getSingleUser(userName, password) {
        console.log(userName, password);
        let sql = 'select  * from user where user_name like ?'
        let data = await poolQuery(sql, [userName])
        let dataConvert = convert.convertArrayToObject(data)
        if (dataConvert) {
            return Promise.resolve(dataConvert)
        }
    }

    genSaltPassword(password) {
        return new Promise((resolve, reject) => {
            const saltRoundsENV = process.env.SALT_ROUND;

            bcrypt.genSalt(saltRoundsENV, function (err, salt) {
                bcrypt.hash(password, salt, function (err, hash) {
                    if (err) {
                       reject(false)
                    }
                    resolve(hash)
                });
            });
        })

    }

    async register(data) {
        let status = 1
        let password = data.password
        let passwordSalt = await this.genSaltPassword(password)

        let sql = `insert into user(user_name,fullname, password, email, phone, address, display_name, user_role_id, status, created_at )  values (?,?, ?, ?, ?, ?, ?, ?, ?, now())`
        let result = await poolQuery(sql, [
            data.user_name,
            data.fullname,
            passwordSalt,
            data.email,
            data.phone,
            data.address,
            data.display_name,
            data.user_role_id,
            status
        ])
        if (result.affected > 0) {
            return resolve(dataConvert)
        }

    }

    async getUserScretCode(code) {
        let sql = 'select  id, user_name, mail_code from user where mail_code = ?'
        const [row, field] = await poolQuery(sql, [code])
        return Promise.all([row])
    }

    async saveScretCode(code, email) {
        let sql = `update user set mail_code = ? where email = ?`
        const result = await poolQuery(sql, [code, email])
        if (result.affected > 0) {
            return Promise.resolve(true)
        }
    }

    async updatePassword() {
        let sql = `update user set mail_code = ? where email = ?`
        const result = await poolQuery(sql, [code, email])
        if (result.affected > 0) {
            return Promise.resolve(true)
        }
    }

}


module.exports = new Product()