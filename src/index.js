const  express = require('express')
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const port = process.env.PORT || 3000

app.use('/',(req, res)=>{
    res.status(200).send('OK')
})

app.listen(port, () => {
    console.log(`Servere is running: 3000`);
})