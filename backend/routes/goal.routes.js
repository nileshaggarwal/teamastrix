const CommentController = require("../controllers/CommentController");
const GoalController = require("../controllers/GoalController");
const isAuthenticated = require("../middlewares/isAuthenticated");

const router = require("express").Router();

router.post("/create-objective", GoalController.addObjective);
router.post("/create-key-result/:id", GoalController.addKeyResult);
router.get("/getAll", GoalController.getGoals);

router.post("/add-comment", isAuthenticated, CommentController.addComment);
router.get("/get/:milestone", CommentController.getAllComments);

module.exports = router;
