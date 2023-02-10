const router = require("express").Router();
const userRouter = require("./user.routes");
const teamRouter = require("./team.routes");
const goalRouter = require("./goal.routes");

router.use("/user", userRouter);
router.use("/team", teamRouter);
router.use("/goal", goalRouter);

module.exports = router;
