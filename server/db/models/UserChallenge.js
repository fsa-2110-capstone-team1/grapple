const Sequelize = require("sequelize");
const db = require("../db");

const { INTEGER, BOOLEAN, ENUM } = Sequelize;

const UserChallenge = db.define("userChallenge", {
  status: {
    type: ENUM("notStarted", "inProgress", "completed", "failed"),
    defaultValue: "notStarted",
  },
  getsPoints: {
    type: BOOLEAN,
    defaultValue: false,
  },
  currentProgress: {
    type: INTEGER,
    validate: {
      min: 0,
      max: 100,
    },
    defaultValue: 0,
  },
  // userId
  // challengeId
});

module.exports = UserChallenge;
