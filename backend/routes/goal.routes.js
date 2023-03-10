const CommentController = require("../controllers/CommentController");
const GoalController = require("../controllers/GoalController");
const isAuthenticated = require("../middlewares/isAuthenticated");

const router = require("express").Router();

router.post("/create-objective", GoalController.addObjective);
router.post("/create-key-result/:id", GoalController.addKeyResult);
router.get("/getAll", GoalController.getGoals);

router.post("/add-comment", isAuthenticated, CommentController.addComment);
router.get("/get/:milestone", CommentController.getAllComments);
router.post("/getAi/ai", CommentController.getAiRecommendations);

router.get(
  "/key-results/user",
  isAuthenticated,
  GoalController.getOkrsByUserId
);
router.get(
  "/key-results/team/:id",
  isAuthenticated,
  GoalController.getOkrbyTeam
);

router.put(
  "/update-progress/:id",
  isAuthenticated,
  GoalController.updateProgress
);
module.exports = router;

router.put(
  "/update-milestone/:id",
  isAuthenticated,
  GoalController.addMileStoneunderMileStone
);
