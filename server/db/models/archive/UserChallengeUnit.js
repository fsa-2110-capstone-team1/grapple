const Sequelize = require("sequelize");
const db = require("../../db");

const { BOOLEAN } = Sequelize;

const UserChallengeUnit = db.define("userChallengeUnit", {
  isChecked: {
    type: BOOLEAN,
    defaultValue: false,
  },
  //userChallengeId
  //challengeId
});

module.exports = UserChallengeUnit;
