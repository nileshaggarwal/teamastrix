const TeamController = require("../controllers/TeamController");
const isManager = require("../middlewares/isManager");
const router = require("express").Router();

router.post("/create", isManager, TeamController.createTeam);
router.get("/get", TeamController.getTeams);
router.get("/get/:id", TeamController.getTeam);
router.post("/add-members/:id", isManager, TeamController.addMembers);
router.put("/change-status/:id", isManager, TeamController.disableTeam);
router.put("/assign-leader/:id/:leader_id", isManager, TeamController.assignLeader);

module.exports = router;
