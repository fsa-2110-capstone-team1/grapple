const Sequelize = require("sequelize");
const db = require("../db");

const { INTEGER, BOOLEAN, ENUM } = Sequelize;

const UserChallenge = db.define("userChallenge", {
  status: {
    type: ENUM("notStarted", "inProgress", "completed", "failed"),
    defaultValue: "notStarted",
  },
  currentProgress: {
    type: INTEGER,
    validate: {
      min: 0,
    },
    defaultValue: 0,
  },
  // userId
  // challengeId
});

// update progress
UserChallenge.prototype.updateProgress = function (value) {
  try {
    return this.update({
      currentProgress: this.currentProgress + value * 1,
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = UserChallenge;
