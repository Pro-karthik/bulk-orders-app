const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')

const productsRoute = require('./routes/products.route.js')
const authenticationRoute = require('./routes/authentication.route.js')


const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
dotenv.config()
const port =  process.env.PORT || 3000

app.use('/api',productsRoute)

app.use('/auth',authenticationRoute)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
}
)

