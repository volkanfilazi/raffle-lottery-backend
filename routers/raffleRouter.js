const router = require("express").Router()
const { createRaffle, getRaffles, joinRaffle, deleteRaffle, manuelResultRaffle, getASingleRaffle } = require("../controllers/raffleController")
const validateToken = require("../middleware/validateTokenHandler")

router.post("/raffle",validateToken, createRaffle)
router.get("/raffles", getRaffles)
router.post("/raffle/join",validateToken, joinRaffle)
router.post("/raffle/start",validateToken, manuelResultRaffle)
router.delete("/raffle/:id",validateToken, deleteRaffle)
router.get("/raffle/:id", getASingleRaffle)

module.exports = router