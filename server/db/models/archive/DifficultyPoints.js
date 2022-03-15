const Sequelize = require("sequelize");
const db = require("../../db");

const { INTEGER } = Sequelize;

const DifficultyPoints = db.define("difficultyPoints", {
  // difficulty: {
  //   type: INTEGER,
  //   defaultValue: 1,
  //   validate: {
  //     min: 1,
  //     max: 5,
  //   }
  // },
  // this should come from challenge difficulty rating
  points: {
    type: INTEGER,
    defaultValue: 1,
    validate: {
      min: 1,
      max: 5,
    },
  },
});

module.exports = DifficultyPoints;
