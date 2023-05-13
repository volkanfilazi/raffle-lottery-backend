const asyncHandler = require("express-async-handler")
const Deposit = require("../models/moneyDeposit")
const User = require("../models/userModel")

const createDeposit = asyncHandler( async (req, res) =>{
  try {
    const { userId, amount} = req.body
    const user = await User.findById(userId)
  
    if(!user){
      res.status(400).json({ error: "User id not found"})
    }

    if(amount <= 0){
      res.status(400).json({ error: "Amount must be greater than 0"})
    }

    const depositUser = await Deposit.create({
      userId,
      amount
    })

    user.balance += amount
    await user.save()
    if(depositUser){
      res.status(201).json(depositUser)
    }else{
      throw new Error("Somethings wrong")
    }
  } catch (error) {
    res.status(500).json({ error: error.message})
  }
})

module.exports = { createDeposit }