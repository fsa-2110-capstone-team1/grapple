const router = require("express").Router();
const {
  models: { StravaWorkout },
} = require("../../db");
module.exports = router;

// Get all strava workouts
router.get("/", async (req, res, next) => {
  try {
    const stravaWorkouts = await StravaWorkout.findAll({
      order: ["id"],
    });
    res.json(stravaWorkouts);
  } catch (err) {
    next(err);
  }
});

// Get a single strava workout
router.get("/:id", async (req, res, next) => {
  try {
    const stravaWorkout = await StravaWorkout.findOne({
      where: { id: req.params.id },
    });
    res.json(stravaWorkout);
  } catch (err) {
    next(err);
  }
});

// Get all strava workouts for a daily user challenge
router.get(
  "/dailyUserChallenge/:dailyUserChallengeId",
  async (req, res, next) => {
    try {
      const stravaWorkouts = await StravaWorkout.findAll({
        where: {
          dailyUserChallengeId: req.params.dailyUserChallengeId,
        },
      });
      res.json(stravaWorkouts);
    } catch (err) {
      next(err);
    }
  }
);

// Create a new strava workout, payload: {dailyUserChallengeId, stravaExternalId, startDate, type, distance, duration}
router.post("/", async (req, res, next) => {
  try {
    res.status(201).send(await StravaWorkout.create(req.body));
  } catch (error) {
    next(error);
  }
});
