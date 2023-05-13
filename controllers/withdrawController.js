const asyncHandler = require("express-async-handler")
const User = require("../models/userModel")
const Withdraw = require("../models/moneyWithdraw")
const bcrypt = require("bcrypt")


const withdrawMoney = asyncHandler( async (req, res) =>{
  try {
    const { userId, amount, password} = req.body
    const user = await User.findById(userId)
    if(!user){
      res.status(400).json({ error: "User not found"})
    }
    const checkPassowrd = await bcrypt.compare(password, user.password)

    if(!checkPassowrd){
      res.status(400).json({ error: "password is wrong!"})
    }

    if(amount > user.balance){
      res.status(400).json({ error: "withdraw amount can not be greater than your balance"})
    }

    await Withdraw.create({
      userId,
      amount,
      password
    })

    user.balance -= amount
    await user.save()
    res.status(201).json({ message: "Money Successfully withdraw",amount})

  } catch (error) {
    res.status(500).json({ error: error.message})
  }
})

module.exports = { withdrawMoney }