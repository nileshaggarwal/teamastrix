const isAuthenticated = require("../middlewares/isAuthenticated");
const UserController = require("../controllers/UserController");
const isManager = require("../middlewares/isManager");
const NotificationController = require("../controllers/NotificationController");

const router = require("express").Router();

router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.post("/add", isAuthenticated, isManager, UserController.addEmployee);
router.put("/reset-password/:id/:token", UserController.ResetPassword);

router.get("/get/:department", UserController.getEmployeesByDepartment);

router.get("/notifications", isAuthenticated, NotificationController.getNotifications);

module.exports = router;
