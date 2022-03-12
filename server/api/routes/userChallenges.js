const router = require('express').Router();
const {
  models: { UserChallenge },
} = require('../../db');
module.exports = router;

// Get all User challenges
router.get('/', async (req, res, next) => {
  try {
    const userChallenge = await UserChallenge.findAll({});
    res.json(userChallenge);
  } catch (err) {
    next(err);
  }
});

// Get a single User challenge
router.get('/:id', async (req, res, next) => {
  try {
    const userChallenge = await UserChallenge.findByPk(req.params.id);
    res.json(userChallenge);
  } catch (err) {
    next(err);
  }
});

// Create a new User challenge
router.post('/', async (req, res, next) => {
  try {
    res.status(201).send(await UserChallenge.create(req.body));
  } catch (error) {
    next(error);
  }
});

// Edit a User challenge
router.put('/:id', async (req, res, next) => {
  try {
    const userChallenge = await UserChallenge.findByPk(req.params.id);
    res.send(await userChallenge.update(req.body));
  } catch (error) {
    next(error);
  }
});

// Delete a User challenge
router.delete('/:id', async (req, res, next) => {
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
