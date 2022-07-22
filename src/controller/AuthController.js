const userModel = require('../model/user/user')
const token = require('../helper/general_jwt')
const sendMailBySystem = require('../helper/send_mail')
const bcrypt = require('bcrypt');

class AuthController {
    async login(req, res) {
        let { user_name, password } = req.body
        let check = true
        check = user_name && password
        if (!check) return res.status(400).json({ message: 'Missing Key in Body' })
        try {
            let user = await userModel.getSingleUser(user_name, password)
            if (Object.keys(user).length > 0) {
                const match = await bcrypt.compare(password, user.password);
                if (match) {
                    let { access_token, refresh_token } = token.generalToken()
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
            }
            return res.status(400).json({
                messasage: 'UserName or password Invalid',
            })

        } catch (err) {
            console.log(err);
            return res.status(400).json({
                messasage: 'Something Error! Try Again',
            })
        }

    }

    async register(req, res) {
        let user_name = req.body.user_name
        let email = req.body.email
        let fullname = req.body.fullname
        let display_name = req.body.display_name
        let user_role_id = req.body.user_role_id
        let phone = req.body.phone
        let address = req.body.address
        let password = req.body.password


        let check = true
        check = user_name && password && email && display_name && fullname
        if (!check) return res.status(400).json({ message: 'Missing Key in Body' })

        user_role_id = user_role_id ? user_role_id : 2

        let dataRegister = {
            user_name,
            password,
            email,
            fullname,
            phone,
            address,
            display_name,
            user_role_id
        }

        try {
            await userModel.register(dataRegister)
            return res.json({
                status: 200,
                messasage: 'Reister Successfully',
            })
        } catch (error) {
            console.log("Error register: ", error)
            return res.status(400).json({
                status: 400,
                messasage: 'Register Failed',
            })
        }

    }

    async forgotPassword(req, res) {
        console.log(`[SendMail]:forgotPassword()`);
        let email = req.body.email
        let secretCodeRandom = (Math.random() * 999999).toFixed()
        setTimeout(() => {
            userModel.saveScretCode(secretCodeRandom, email)
        }, 1000);
        await sendMailBySystem(secretCodeRandom)
        return res.json({
            messasage: 'sendMail Successfully! Please Check Your Email',
        })
    }

    async changePassword(req, res) {
        let userSecretCode = req.body.code
        let newPassword = req.body.newPassword

        let check = true
        check = userSecretCode && newPassword
        if (!check) return res.status(400).json({ message: 'Missing Key in Body' })

        try {
            let codeBySystem = await userModel.getUserScretCode(userSecretCode)
            if (codeBySystem[0]) {
                await userModel.updatePassword(id, newPassword)
                return res.json({
                    messasage: 'ChangePassword Successfully!'
                })
            } else {
                return res.status(401).json({
                    messasage: 'ChangePassword Failed!'
                })
            }

        } catch (error) {
            console.log(error)
            return res.status(401).json({
                messasage: 'ChangePassword Failed!'
            })
        }
    }

}

module.exports = new AuthController()