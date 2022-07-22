const userRoute = require('./user')
const  product = require('./product')
function Router(app) {

    global.responseAPI = {
        success: (status, message, data) => {
            app.use((req, res, next) => {
                res.json({
                    status: status | 200,
                    message: message | null,
                    data: data | []
                })
            })

        },
        error: (status, message, data) => {
            app.use((req, res, next) => {
                res.json({
                    status: status | 400,
                    message: message | null,
                    data: data | []
                })
            })
        }
    }


app.use('/auth', userRoute)

app.use('/public', product)

// app.use('/api', homeController.homePage)


// app.use('/', homeController.homePage)

// Handle HTTP Error
app.use((req, res, next) => {
    if (res.status(404)) {
        res.status(404)
        return res.json({ error: '404 not Found' })
    }
    next()
})

app.use((err, req, res, next) => {
    if (err) {
        console.log(err);
        res.status(400)
        res.json({
            status: res.status | 500,
            message: err || 'Server Something Error',
        })
    }
})

}

module.exports = Router