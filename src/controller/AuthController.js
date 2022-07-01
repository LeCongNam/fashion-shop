const userModel = require('../model/user/user')
const token = require('../helper/general_jwt')

class AuthController {
    async login(req, res) {
        let { user_name, password } = req.body
        let check = true
        check = user_name && password
        if (!check) return res.status(400).json({ message: 'Missing Key in Body' })
        let user = await userModel.getSingleUser(user_name, password)
        let { access_token, refresh_token } = token.generalToken()
        if (user && user_name == user.user_name && password == user.password) {
            return res.json({
                messasage: 'Login Successfully',
                data: {
                    user_id: user.id,
                    user_name: user.user_name,
                    email: user.email,
                    access_token,
                    refresh_token,
                }
            })
        }

        return res.status(400).json({
            messasage: 'UserName or password Invalid',
        })

    }

    async register(req, res) {
        let user_name = req.body.user_name
        let  password= req.body.password
        let email= req.body.email

        let check = true
        check = user_name && password && email
        if (!check) return res.status(400).json({ message: 'Missing Key in Body' })
        try {
            await userModel.register([...req.body])
            return res.json({
                status: 200,
                messasage: 'Reister Successfully',
            })


        } catch (error) {
            return res.status(400).json({
                status: 400,
                messasage: 'Register Failed',
            })
        }

    }

}

module.exports = new AuthController()