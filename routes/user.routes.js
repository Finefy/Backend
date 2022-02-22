const router = require("express").Router();
const usersController = require("../controllers/users");

// GET /users/account
router.get("/account", usersController.getUser);

// POST /users/account
router.post("/account", usersController.updateUser);

router.get("/isLogin", usersController.isLoggedIn);

module.exports = router;