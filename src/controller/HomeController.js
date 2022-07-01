const redis = require('../config/redis')
const userModel = require('../model/user/user')

class HomeController {
    async homePage(req, res){
        try {
            let listUser = await redis.get('listUser')
            
            if (listUser != null) {
               return res.json({
                    data: JSON.parse(listUser)
                })
            }
            let data = await  userModel.getAllUser()
            await redis.set('listUser', JSON.stringify(data))
            res.json({
                data: data
            })
        } catch (error) {
            res.status(400).json({
                err: 'Cannot get User'
            })
        }
    }
}

module.exports = new HomeController()