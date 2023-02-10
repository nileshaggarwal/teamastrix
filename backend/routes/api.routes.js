const router = require("express").Router();
const userRouter = require("./user.routes");
const teamRouter = require("./team.routes");

router.use("/user", userRouter);
router.use("/team", teamRouter);

module.exports = router;
