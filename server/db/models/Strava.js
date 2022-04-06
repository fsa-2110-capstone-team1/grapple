const Sequelize = require("sequelize");
const db = require("../db");

const { INTEGER, DATE, ENUM, DECIMAL, STRING } = Sequelize;

const StravaWorkout = db.define("stravaWorkout", {
  //dailyUserChallengeId
  stravaExternalId: {
    type: STRING, //maybe actual GUID, confirm from strava
    allowNull: false,
  },
  startDate: {
    type: DATE,
    allowNull: false,
  },
  type: {
    type: ENUM("Yoga", "Walk", "Stretch", "General", "Bike", "Run"),
  },
  elapsedTime: {
    type: INTEGER,
  },
  distance: {
    type: DECIMAL,
  },
});

// add progress to daily user challenge linked
StravaWorkout.afterCreate(async (stravaWorkout) => {
  const dailyUserChallenge = await stravaWorkout.getDailyUserChallenge();
  const userChallenge = await dailyUserChallenge.getUserChallenge();
  const challenge = await userChallenge.getChallenge();
  const currentProgress = Number(dailyUserChallenge.total);
  let value;
  if (challenge.targetUnit === "days") {
    await dailyUserChallenge.update({ total: 1 });
  } else if (challenge.targetUnit === "hours") {
    value = stravaWorkout.elapsedTime / 60 / 60;
    await dailyUserChallenge.update({ total: currentProgress + value });
  } else if (challenge.targetUnit === "minutes") {
    value = stravaWorkout.elapsedTime / 60;
    await dailyUserChallenge.update({ total: currentProgress + value });
  } else if (challenge.targetUnit === "seconds") {
    value = stravaWorkout.elapsedTime;
    await dailyUserChallenge.update({ total: currentProgress + value });
  } else if (challenge.targetUnit === "miles") {
    value = stravaWorkout.distance / 1609.344;
    await dailyUserChallenge.update({ total: currentProgress + value });
  } else if (challenge.targetUnit === "meters") {
    value = stravaWorkout.distance;
    await dailyUserChallenge.update({ total: currentProgress + value });

  }
});

module.exports = StravaWorkout;
