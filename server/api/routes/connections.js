const router = require('express').Router();
const {
  models: { Connection },
} = require('../../db');
module.exports = router;

// Get all user connections
router.get('/', async (req, res, next) => {
  try {
    const connections = await Connection.findAll({});
    res.json(connections);
  } catch (err) {
    next(err);
  }
});

// Get a single users connection
router.get('/:id', async (req, res, next) => {
  try {
    const connections = await Connection.findByPk(req.params.id);
    res.json(connections);
  } catch (err) {
    next(err);
  }
});

// Create a new connection
router.post('/', async (req, res, next) => {
  try {
    res.status(201).send(await Connection.create(req.body));
  } catch (error) {
    next(error);
  }
});

// Edit a connection
router.put('/:id', async (req, res, next) => {
  try {
    const connection = await Connection.findByPk(req.params.id);
    res.send(await connection.update(req.body));
  } catch (error) {
    next(error);
  }
});

// Delete a connection :(
router.delete('/:id', async (req, res, next) => {
  try {
    const connection = await Connection.findByPk(req.params.id);
    if (!connection) {
      res.sendStatus(404);
    } else {
      await connection.destroy();
      res.sendStatus(204);
    }
  } catch (error) {
    next(error);
  }
});
