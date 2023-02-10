const UserController = require("../controllers/UserController");
const isManager = require("../middlewares/isManager");

const router = require("express").Router();

router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.post("/add", isManager, UserController.addEmployee);
router.put("/reset-password/:id/:token", UserController.ResetPassword);

router.get("/get/:department", UserController.getEmployeesByDepartment);

module.exports = router;
