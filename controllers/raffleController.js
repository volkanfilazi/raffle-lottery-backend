const asyncHandler = require("express-async-handler")
const User = require("../models/userModel")
const Raffle = require("../models/raffleModel")
const { default: mongoose } = require("mongoose")

const createRaffle = asyncHandler(async (req, res) => {
  try {
    const { createdBy, giftBalance, maxParticipants } = req.body
    const checkUser = await User.findOne({ _id: createdBy })
    const checkBalance = await User.findById(createdBy)

    if(checkBalance.balance < giftBalance){
      res.status(400).json({ error: "Your balance is not enough"})
      return;
    }

    if (!checkUser) {
      res.status(404).json({ error: "User not found" })
    }
    
    checkBalance.balance -= giftBalance
    await checkBalance.save()

    const newRaffle = await Raffle.create({
      createdBy,
      giftBalance,
      maxParticipants,
      participants: [],
      winner: null,
      available: true
    })

    if (newRaffle) {
      if(newRaffle.participants.length >= maxParticipants){
        const winnerIndex = Math.floor(Math.random() * newRaffle.participants.length)
        const winner = newRaffle.participants[winnerIndex]
        winner.balance += giftBalance
        newRaffle.winner = winner._id
        newRaffle.available = false
      }
      res.status(201).json(newRaffle)
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

const getRaffles = asyncHandler(async (req, res) => {
  try {
    const raffles = await Raffle.find().populate('participants winner');
    if (!raffles || raffles.length === 0) { // Raffles dizisi boş ise
      return res.status(404).json({ error: "No raffles found" });
    }
    res.status(200).json(raffles);
  } catch (error) {
    console.error(error); // Hatanın konsola yazdırılması
    res.status(500).json({ error: "Internal server error" });
  }
});

const joinRaffle = asyncHandler( async (req, res) =>{ 
  try {
    const { raffleId, userId} = req.body
    const raffle = await Raffle.findById(raffleId)
    const user = await User.findById(userId)

    if(!raffle){
      res.status(404).json({ error: "Raffle not found"})
    }

    if(!user){
      res.status(404).json({ error: "User not found"})
    }

    if(raffle.participants.includes(userId) && raffle.available === true){
      res.status(400).json({ error: "User is already joined this raffle"})
    }

    if(!raffle.participants.includes(userId)){
      raffle.participants.push(userId)
    await raffle.save();
    res.status(200).json({ message: "User successfully joined the raffle"})
    }
  } catch (error) {
    res.status(500).json({ error: error.message})
  }
})
const deleteRaffle = asyncHandler(async (req, res) => {
  try {
    const raffle = await Raffle.findById(req.params.id)
    if (!raffle) {
      return res.status(400).json({ error: "Raffle not found" })
    }
    if (raffle.participants.length < raffle.maxParticipants) {
      const raffleOwner = await User.findById(raffle.createdBy)
      raffleOwner.balance += raffle.giftBalance
      await raffleOwner.save()
      await Raffle.findByIdAndDelete(req.params.id)
      return res.status(200).json({ message: "Raffle Canceled" })
    } else {
      return res.status(400).json({ error: "Cannot cancel the raffle" })
    }
  } catch (error) {
    return res.status(500).json({ error: "An error occurred while canceling the raffle" })
  }
})

const manuelResultRaffle = asyncHandler(async (req, res) => {
  try {
    const { raffleId } = req.body
    const raffle = await Raffle.findById(raffleId)
    if (!raffle) {
      return res.status(400).json({ error: "Raffle id not found" })
    }

    if (!new mongoose.Types.ObjectId(raffle.createdBy).equals(req.user._id)) {
      return res.status(403).json({ error: "Only the creator can manually announce the raffle result" })
    }

    const winnerIndex = Math.floor(Math.random() * raffle.participants.length)

    const winner = await User.findById(raffle.participants[winnerIndex]._id);

    winner.balance += raffle.giftBalance
    await winner.save()
    raffle.winner = winner
    if(raffle.winner){
      raffle.available = false
    }
    await raffle.save()

    return res.status(200).json(raffle.winner)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: "An error occurred while announcing the raffle result" })
  }
})

const getASingleRaffle = asyncHandler( async (req, res) =>{
  try {
    const singleRaffle = await Raffle.findById(req.params.id)
    .populate('participants')
    .populate('winner')
    if(!singleRaffle){
      return res.status(400).json({ error: "Raffle id not found"})
    }
    res.status(200).json(singleRaffle)
  } catch (error) {
    return res.status(400).json({ error: "An error occured while get single raffle"})
  }
})

module.exports = { createRaffle, getRaffles, joinRaffle, deleteRaffle, manuelResultRaffle, getASingleRaffle }