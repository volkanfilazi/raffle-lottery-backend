const { Schema } = require("mongoose")
const mongoose = require("mongoose")

const withdrawSchema = mongoose.Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Please add the id of user for withdraw money"]
  },
  amount: {
    type: Number,
    required: [true, "Please add your withdraw value"]
  },
  password: {
    type: String,
    Required: [true, "Please input your password"]
  }
})

module.exports = mongoose.model("Withdraw", withdrawSchema)