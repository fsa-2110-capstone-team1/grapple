const router = require('express').Router();
const {
  models: { Challenge },
} = require('../../db');
module.exports = router;

// Get all challenges
router.get('/', async (req, res, next) => {
  try {
    const challenges = await Challenge.findAll({});
    res.json(challenges);
  } catch (err) {
    next(err);
  }
});

// Get a single challenge
router.get('/:id', async (req, res, next) => {
  try {
    const challenge = await Challenge.findByPk(req.params.id);
    res.json(challenge);
  } catch (err) {
    next(err);
  }
});

// Create a new challenge
router.post('/', async (req, res, next) => {
  try {
    res.status(201).send(await Challenge.create(req.body));
  } catch (error) {
    next(error);
  }
});

// Edit an exhisting challenge
router.put('/:id', async (req, res, next) => {
  try {
    const challenge = await Challenge.findByPk(req.params.id);
    res.send(await challenge.update(req.body));
  } catch (error) {
    next(error);
  }
});

// Delete a challenge
router.delete('/:id', async (req, res, next) => {
  try {
    const challenge = await Challenge.findByPk(req.params.id);
    if (!challenge) {
      res.sendStatus(404);
    } else {
      await challenge.destroy();
      res.sendStatus(204);
    }
  } catch (error) {
    next(error);
  }
});
