const router = require("express").Router()
const { createDeposit } = require("../controllers/depositController")
const validateToken = require("../middleware/validateTokenHandler")

router.post("/deposit",validateToken, createDeposit)

module.exports = router