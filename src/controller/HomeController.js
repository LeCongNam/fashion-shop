const redis = require('../config/redis')
const productModel = require('../model/product/product')

class HomeController {
    async homePage(req, res){
        try {
            let page = req.query.page
            let listProduct = await redis.get(`listProduct${page}`)
            if (listProduct != null) {
               return res.json({
                    data: JSON.parse(listProduct)
                })
            }
            let data = await  productModel.getProductByPage(page)
            await redis.set(`listProduct${page}`, JSON.stringify(data))
            res.json({
                status: 200,
                message: "Success",
                data: data
            })
        } catch (error) {
            console.log("[homePage]: ",error);
            res.status(400).json({
                err: 'Cannot get Product'
            })
        }
    }
}

module.exports = new HomeController()