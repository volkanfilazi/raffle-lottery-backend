const router = require("express").Router()
const { createUser, getUsers, deleteUser, updateUser, getSingleUser, login, currentUser } = require("../controllers/userController")
const validateToken = require("../middleware/validateTokenHandler")


router.route("/register")
.get(getUsers)
.post(createUser)

router.route("/login")
.post(login)


router.get("/currentuser",validateToken, currentUser)

router.route("/:id")
.get(getSingleUser)
.put(updateUser)
.delete(deleteUser)

module.exports = router