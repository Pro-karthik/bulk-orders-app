const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')


const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
dotenv.config()
const port = 3000 || process.env.PORT


app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
}
)

