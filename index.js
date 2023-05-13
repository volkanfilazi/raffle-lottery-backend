const express = require("express")
const connectDb = require("./config/dbConnection")
const cors = require('cors')
const userRouter = require("./routers/userRouter")
const raffleRouter = require("./routers/raffleRouter")
const depositRouter = require("./routers/depositRouter")
const withdrawRouter = require("./routers/withdrawRouter")
const errorHandler = require("./middleware/errorHandler")


connectDb()
require('dotenv').config()

const server = express()
server.use(cors({
  origin: ['http://localhost:4000', 'http://127.0.0.1:5173']
}));
server.use(express.json())
server.use('/api/user', userRouter)
server.use('/api', raffleRouter)
server.use('/api/transaction', depositRouter)
server.use('/api/transaction', withdrawRouter)
server.use(errorHandler)


server.get("/",(req, res) => {
  res.send("Server running")
})

server.listen(5001 || 5000, () => console.log("server is running"))