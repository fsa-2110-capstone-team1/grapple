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
  loggedValue: {
    type: DECIMAL,
  },
  loggedUnit: {
    type: STRING,
  },
});

// add progress to daily user challenge linked
StravaWorkout.afterCreate(async (stravaWorkout) => {
  const dailyUserChallenge = await stravaWorkout.getDailyUserChallenge();
  const userChallenge = await dailyUserChallenge.getUserChallenge();
  const challenge = await userChallenge.getChallenge();
  const currentProgress = Number(dailyUserChallenge.total);

  function round(num) {
    var m = Number((Math.abs(num) * 100).toPrecision(15));
    return (Math.round(m) / 100) * Math.sign(num);
  }

  let value;
  if (challenge.targetUnit === "days") {
    await dailyUserChallenge.update({ total: 1 });
    await stravaWorkout.update({ loggedValue: 1, loggedUnit: "days" });
  } else if (challenge.targetUnit === "hours") {
    value = round(stravaWorkout.elapsedTime / 60 / 60);
    await dailyUserChallenge.update({ total: currentProgress + value });
    await stravaWorkout.update({ loggedValue: value, loggedUnit: "hours" });
  } else if (challenge.targetUnit === "minutes") {
    value = round(stravaWorkout.elapsedTime / 60);
    await dailyUserChallenge.update({ total: currentProgress + value });
    await stravaWorkout.update({ loggedValue: value, loggedUnit: "minutes" });
  } else if (challenge.targetUnit === "seconds") {
    value = round(stravaWorkout.elapsedTime);
    await dailyUserChallenge.update({ total: currentProgress + value });
    await stravaWorkout.update({ loggedValue: value, loggedUnit: "seconds" });
  } else if (challenge.targetUnit === "miles") {
    value = round(stravaWorkout.distance / 1609.344);
    await dailyUserChallenge.update({ total: currentProgress + value });
    await stravaWorkout.update({ loggedValue: value, loggedUnit: "miles" });
  } else if (challenge.targetUnit === "meters") {
    value = round(stravaWorkout.distance);
    await dailyUserChallenge.update({ total: currentProgress + value });
    await stravaWorkout.update({ loggedValue: value, loggedUnit: "meters" });
  }
});

module.exports = StravaWorkout;
