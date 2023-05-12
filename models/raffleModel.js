const { Schema } = require('mongoose')
const mongoose = require('mongoose')

const raffleSchema = mongoose.Schema({
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Please add the id of user wo created the raffle"]
  },
  giftBalance: {
    type: Number,
    required: [true, "Please add a gift balance"]
  },
  maxParticipants: {
    type: Number,
    required: [true, "Please input max participants value"]
  },
  participants: [{
    type: Schema.Types.ObjectId,
    ref: "User"
  }],
  winner: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  available: {
    type: Boolean
  }
})

module.exports = mongoose.model("Raffle", raffleSchema)