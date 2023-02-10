const GoalController = require("../controllers/GoalController");

const router = require("express").Router();

router.post("/create-objective", GoalController.addObjective);
router.post("/create-key-result/:id", GoalController.addKeyResult);

module.exports = router;
