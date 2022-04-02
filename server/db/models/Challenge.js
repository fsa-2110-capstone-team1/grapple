const Sequelize = require("sequelize");
const db = require("../db");

const { INTEGER, BOOLEAN, DATE, STRING, TEXT, ENUM } = Sequelize;

const Challenge = db.define("challenge", {
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
    validate: {
      notEmpty: true,
    },
  },
  image: {
    type: TEXT,
    defaultValue: "badges/picId-014.svg",
  },
  startDateTime: {
    type: DATE,
    allowNull: false,
  },
  endDateTime: {
    type: DATE,
    allowNull: false,
  },
  targetNumber: {
    type: INTEGER,
  },
  targetUnit: {
    type: STRING,
  },
  goalType: {
    //daily means we'll count progress based on number of days the targetNumber is reached
    //total means we'll add up the daily progress and track against the targetNumber
    type: ENUM("daily", "total"),
    defaultValue: "total",
    allowNull: false,
  },
  difficulty: {
    type: INTEGER,
    defaultValue: 1,
    validate: {
      min: 1,
      max: 5,
    },
  },
  isPrivate: {
    type: BOOLEAN,
    defaultValue: false,
  },
  category: {
    type: ENUM("mental", "physical", "food", "sleep", "misc"),
    defaultValue: "misc",
    allowNull: false,
  },
});

module.exports = Challenge;
