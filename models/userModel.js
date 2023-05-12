const mongoose = require('mongoose')
const userShema = mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please add an username"]
  },
  email: {
    type: String,
    required: [true, "Please add an email adress"],
    unique: [true, "Email adress already taken"]
  },
  password: {
    type: String,
    required: [true, "Please add a password"]
  },
  token: {
    type: String
  },
  admin: {
    type: Boolean
  },
  balance: {
    type: Number
  }
})

module.exports = mongoose.model("User", userShema)