const isAuthenticated = require("../middlewares/isAuthenticated");
const TeamController = require("../controllers/TeamController");
const isManager = require("../middlewares/isManager");
const router = require("express").Router();

router.post("/create", isAuthenticated, isManager, TeamController.createTeam);
router.get("/get", TeamController.getTeams);
router.get("/get/leader/:id", TeamController.getTeamByLeader);
router.get("/get/:id", TeamController.getTeam);
router.get("/get-All", TeamController.getAllTeams);
router.get("/generate", TeamController.generateHeatMap);

// router.post("/add-members/:id", isManager, TeamController.addMembers);
router.put("/change-status/:id", isManager, TeamController.disableTeam);
router.put(
  "/assign-leader/:id/:leader_id",
  isManager,
  TeamController.assignLeader
);

router.put(
  "/update/:id",
  isAuthenticated,
  isManager,
  TeamController.updateTeam
);

module.exports = router;
