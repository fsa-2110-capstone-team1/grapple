const Sequelize = require("sequelize");
const db = require("../db");

const { INTEGER, BOOLEAN, DATE, STRING, TEXT, ENUM } = Sequelize;

const Strava = db.define("Strava", {
//userId
  startDateTime: {
    type: DATE,
    allowNull: false,
  },
  endDateTime: {
    type: DATE,
    allowNull: false,
  },
  workoutType: {
    type: ENUM("Yoga", "Walk", "Stretch", "General", "Bike" )
  },
  distance: {
    type: INTEGER
  }
});

module.exports = Strava;