const Sequelize = require("sequelize");
const db = require("../db");

const { INTEGER, DATE, ENUM, DECIMAL } = Sequelize;

const StravaWorkout = db.define("stravaWorkout", {
  //userId
  startDate: {
    type: DATE,
    allowNull: false,
  },
  elapsedTime: {
    type: INTEGER,
  },
  type: {
    type: ENUM("Yoga", "Walk", "Stretch", "General", "Bike", "Run"),
  },
  distance: {
    type: DECIMAL,
  },
});

module.exports = StravaWorkout;
