const mongoose = require("mongoose")
require('dotenv').config()

const connectDb = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGODB_KEY)
    console.log("Databbase connect", connect.connection.host, connect.connection.name);
  } catch (error) {
    console.log(error);
    process.exit(1)
  }
}

module.exports = connectDb