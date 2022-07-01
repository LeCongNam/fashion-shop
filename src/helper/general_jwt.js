const jwt = require('jsonwebtoken')

const generalToken =  (userName, password)=>{
    let access_token = jwt.sign(
        {userName, password}, 
        process.env.SECRET_KEY,{
            expiresIn: '1h'
    })

    let refresh_token = jwt.sign(
        {userName, password}, 
        process.env.SECRET_KEY,{
            expiresIn: '180d'
    })

    return {access_token, refresh_token}
}

module.exports = {
    generalToken
}
