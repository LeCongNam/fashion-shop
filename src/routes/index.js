const homeController = require('../controller/HomeController')
const userRoute = require('./user/user')


function Router(app) {

    app.use('/auth', userRoute)

    app.use('/',homeController.homePage )


    // Handle Error HTTP
    app.use((req, res, next) => {
        console.log(res.status)
        if (res.status(404)) {
            res.status(404)
            return res.json({ error: '404 not Found' })
        }
        next()
    })


    app.use((req, res, next) => {
        if (res.status(400)) {
      
            res.status(400)
            return res.json({ error: 'Bad Request' })
        }
        next()
    })


    app.use((err, req, res, next) => {
        if (err) {
            console.log(err);
            res.status(400)
            res.json({
                error: 'Server Somthing Error',
                message: err,
                status: res.status | 500
            })
        }
    })

}

module.exports = Router