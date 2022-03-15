const Sequelize = require("sequelize");
const db = require("../../db");

const { TEXT, STRING } = Sequelize;

const ChallengeUnit = db.define("challengeUnit", {
  name: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  description: {
    type: TEXT,
    allowNull: false,
  },
  imageURL: {
    type: TEXT,
    validate: {
      isUrl: true,
    },
  },
  //challengeId
});

module.exports = ChallengeUnit;
