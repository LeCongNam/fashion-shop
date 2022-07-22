const express =  require('express')
const router = express.Router()
const homeController = require('../controller/HomeController')


router.get('/get-products',homeController.homePage)


module.exports = router