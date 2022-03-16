const router = require("express").Router();
const {
  db,
  models: { Connection },
} = require("../../db");
const { Op } = db.Sequelize;

module.exports = router;

// Get all user connections
router.get("/", async (req, res, next) => {
  try {
    const connections = await Connection.findAll({});
    res.json(connections);
  } catch (err) {
    next(err);
  }
});

// Get a single users connection
router.get("/:userId", async (req, res, next) => {
  try {
    const connections = await Connection.findAll({
      where: {
        [Op.or]: [
          { requester_userId: req.params.userId },
          { requested_userId: req.params.userId },
        ],
      },
    });
    res.json(connections);
  } catch (err) {
    next(err);
  }
});

// Create a new connection
router.post("/", async (req, res, next) => {
  try {
    res.status(201).send(await Connection.create(req.body));
  } catch (error) {
    next(error);
  }
});

// Change a connection to accepted
router.put("/acceptRequest/:id", async (req, res, next) => {
  try {
    const connection = await Connection.findByPk(req.params.id);
    res.send(await connection.update({ status: "accepted" }));
  } catch (error) {
    next(error);
  }
});

// Delete a connection :(
router.delete("/:id", async (req, res, next) => {
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
