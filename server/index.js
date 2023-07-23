const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const connectDB = require('./db/connect')
const adminRouter = require('./routes/admin')
const userRouter = require('./routes/user')

const app = express()
dotenv.config()

const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

app.use('/admin', adminRouter)
app.use('/users', userRouter)

// connect and listen
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`)
    })
  } catch (error) {
    console.log(error)
  }
}
start()
