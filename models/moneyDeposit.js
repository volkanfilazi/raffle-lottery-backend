const { Schema } = require("mongoose")
const mongoose = require("mongoose")
const depositSchema = mongoose.Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Please add the id of user for deposit"]
  },
  amount: {
    type: Number,
    required: [true, "Please add your deposit value"]
  },
})

module.exports = mongoose.model("Deposit", depositSchema)