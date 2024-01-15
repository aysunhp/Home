
const express = require('express')
const app = express()
const cors = require('cors')
require("./src/config/db")
require('dotenv').config()
const bodyParser = require('body-parser')
const router = require("./src/routers/artistRouter")
const port = process.env.PORT

app.use(cors())
app.use(bodyParser.json())
app.use("/", router)

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})