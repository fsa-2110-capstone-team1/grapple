const router = require("express").Router();
const {
  db,
  models: { Connection, User },
} = require("../../db");
const { Op } = db.Sequelize;
const axios = require("axios");
require("dotenv").config();

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
    const connection = await Connection.create(req.body);
    const requester = await User.findByPk(connection.requester_userId);
    const requested = await User.findByPk(connection.requested_userId);
    await axios.post(
      "https://api.engagespot.co/v3/notifications",
      {
        notification: {
          title: `You have a new friend request from ${requester.username}`,
          // DEPLOY NOTE: need to replace URL
          url: `/users/profile/${requester.username}`,
          icon: requester.image,
        },
        recipients: [requested.username],
      },
      {
        headers: {
          "X-ENGAGESPOT-API-KEY": process.env.ENGAGESPOT_API_KEY,
          "X-ENGAGESPOT-API-SECRET": process.env.ENGAGESPOT_API_SECRET,
        },
      }
    );
    res.status(201).send(connection);
  } catch (error) {
    next(error);
  }
});

// Change a connection to accepted
router.put("/acceptRequest/:id", async (req, res, next) => {
  try {
    const connection = await Connection.findByPk(req.params.id);
    const requester = await User.findByPk(connection.requester_userId);
    const requested = await User.findByPk(connection.requested_userId);
    await axios.post(
      "https://api.engagespot.co/v3/notifications",
      {
        notification: {
          title: `${requested.username} has accepted your friend request!`,
          // DEPLOY NOTE: need to replace URL
          url: `/users/profile/${requested.username}`,
          icon: requested.image,
        },
        recipients: [requester.username],
      },
      {
        headers: {
          "X-ENGAGESPOT-API-KEY": process.env.ENGAGESPOT_API_KEY,
          "X-ENGAGESPOT-API-SECRET": process.env.ENGAGESPOT_API_SECRET,
        },
      }
    );
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
