const express =  require('express')
const router = express.Router()
const authController = require('../../controller/AuthController')


router.post('/login',authController.login)
router.post('/register',authController.register)
router.post('/forgot-password',authController.forgotPassword)
router.post('/change-password',authController.changePassword)

module.exports =  router