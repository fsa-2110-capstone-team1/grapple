const router = require("express").Router();
const {
  models: { UserChallenge },
} = require("../../db");
module.exports = router;

// Get all User challenges
router.get("/", async (req, res, next) => {
  try {
    const userChallenge = await UserChallenge.findAll({});
    res.json(userChallenge);
  } catch (err) {
    next(err);
  }
});

// Get a single User challenge
router.get("/:id", async (req, res, next) => {
  try {
    const userChallenge = await UserChallenge.findAll({});
    res.json(userChallenge);
  } catch (err) {
    next(err);
  }
});

// Get all User challenges for a user
router.get("/user/:userId", async (req, res, next) => {
  try {
    const userChallenge = await UserChallenge.findAll({
      where: {
        userId: req.params.userId,
      },
    });
    res.json(userChallenge);
  } catch (err) {
    next(err);
  }
});

// Create a new User challenge
router.post("/", async (req, res, next) => {
  try {
    res.status(201).send(await UserChallenge.create(req.body));
  } catch (error) {
    next(error);
  }
});

// Update progress to a User challenge; payload: { method (add or subtract), value }
router.put("/:id/updateProgress", async (req, res, next) => {
  try {
    const userChallenge = await UserChallenge.findByPk(req.params.id);
    res.send(await userChallenge.updateProgress(req.body.value));
  } catch (error) {
    next(error);
  }
});

// Delete a User challenge
router.delete("/:id", async (req, res, next) => {
  try {
    const userChallenge = await UserChallenge.findByPk(req.params.id);
    if (!userChallenge) {
      res.sendStatus(404);
    } else {
      await userChallenge.destroy();
      res.sendStatus(204);
    }
  } catch (error) {
    next(error);
  }
});
