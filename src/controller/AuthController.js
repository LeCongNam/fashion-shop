const userModel = require('../model/user/user')
const token = require('../helper/general_jwt')
const sendMailBySystem = require('../helper/send_mail')

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
        let user_name = req.body.user_name || null
        let password = req.body.password || null
        let email = req.body.email || null

        let check = true
        check = user_name && password && email
        if (!check) return res.status(400).json({ message: 'Missing Key in Body' })

        let dataRegister = {
            user_name: user_name,
            password: password,
            email: email,
            fullname: req.body.fullname || null,
            phone: req.body.phone || null,
            address: req.body.address || null
        }

        try {
            await userModel.register(dataRegister)
            return res.json({
                status: 200,
                messasage: 'Reister Successfully',
            })
        } catch (error) {
            console.log(error)
            return res.status(400).json({
                status: 400,
                messasage: 'Register Failed',
            })
        }

    }

    async forgotPassword(req, res) {
        let secretCodeRandom = (Math.random() * 999999).toFixed()
        setTimeout(() => {
            userModel.saveScretCode(forgotPassword)
        }, 1000);
        await sendMailBySystem(secretCodeRandom)
        return res.json({
            messasage: 'sendMail Successfully! Please Check Your Email',
        })
    }

    async changePassword(req, res) {
        let userSecretCode = req.body.code | null
        let userId = req.body.user_id | null
        let newPassword = req.body.newPassword | null

        try {
            let codeBySystem = await userModel.getUserScretCode(userId)
            console.log(codeBySystem);
            return res.json({
                messasage: 'ChangePassword Successfully!'
            })
        } catch (error) {
            console.log(error)
            return res.status(401).json({
                messasage: 'ChangePassword Failed!'
            })
        }
    }

}

module.exports = new AuthController()