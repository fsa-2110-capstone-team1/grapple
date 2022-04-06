const router = require("express").Router();
const {
  models: { DailyUserChallenge },
} = require("../../db");
module.exports = router;

// Get all Daily User challenges
router.get("/", async (req, res, next) => {
  try {
    const dailyUserChallenge = await DailyUserChallenge.findAll({
      order: ["id"],
    });
    res.json(dailyUserChallenge);
  } catch (err) {
    next(err);
  }
});

// Get a single daily User challenge
router.get("/:id", async (req, res, next) => {
  try {
    const dailyUserChallenge = await DailyUserChallenge.findOne({
      where: { id: req.params.id },
      include: ["stravaWorkouts"],
    });
    res.json(dailyUserChallenge);
  } catch (err) {
    next(err);
  }
});

// Get all Daily User challenges for a user challenge
router.get("/userChallenge/:userChallengeId", async (req, res, next) => {
  try {
    const dailyUserChallenge = await DailyUserChallenge.findAll({
      where: {
        userChallengeId: req.params.userChallengeId,
      },
    });
    res.json(dailyUserChallenge);
  } catch (err) {
    next(err);
  }
});

// Create a new daily user challenge, payload: {userChallengeId, date, total}
router.post("/", async (req, res, next) => {
  try {
    res.status(201).send(await DailyUserChallenge.create(req.body));
  } catch (error) {
    next(error);
  }
});

// Update progress to a daily user challenge; payload: { value }
router.put("/:id/updateProgress", async (req, res, next) => {
  try {
    const dailyUserChallenge = await DailyUserChallenge.findByPk(req.params.id);
    res.send(await dailyUserChallenge.updateProgress(req.body.value));
  } catch (err) {
    if (err.name === "SequelizeValidationError") {
      console.log(err);
      res.status(401).send("Current progress must be greater or equal to 0.");
    } else {
      next(err);
    }
  }
});

// Delete a daily user challenge
router.delete("/:id", async (req, res, next) => {
  try {
    const dailyUserChallenge = await DailyUserChallenge.findByPk(req.params.id);
    if (!dailyUserChallenge) {
      res.sendStatus(404);
    } else {
      await dailyUserChallenge.destroy();
      res.sendStatus(204);
    }
  } catch (error) {
    next(error);
  }
});
