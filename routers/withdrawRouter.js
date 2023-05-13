const router = require("express").Router()
const { withdrawMoney } = require("../controllers/withdrawController")
const validateToken = require("../middleware/validateTokenHandler")

router.post("/withdraw",validateToken, withdrawMoney)

module.exports = router