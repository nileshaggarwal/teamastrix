const UserController = require("../controllers/UserController");
const isManager = require("../middlewares/isManager");

const router = require("express").Router();

router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.post("/add", isManager, UserController.addEmployee);
router.put("/change-password/:id", UserController.ResetPassword);

module.exports = router;
