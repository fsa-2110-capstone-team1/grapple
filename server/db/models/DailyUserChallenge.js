const Sequelize = require("sequelize");
const db = require("../db");

const { DATE, DECIMAL, literal } = Sequelize;

const DailyUserChallenge = db.define("dailyUserChallenge", {
  total: {
    type: DECIMAL,
    validate: {
      min: 0,
    },
    defaultValue: 0,
    allowNull: false,
  },
  date: {
    type: DATE,
    allowNull: false,
  },
  // userChallengeId
});

// not allowed in the front-end but preventing errors when seeding
DailyUserChallenge.beforeCreate(async (dailyUserChallenge) => {
  const duplicate = await DailyUserChallenge.findOne({
    where: {
      userChallengeId: dailyUserChallenge.userChallengeId,
      date: dailyUserChallenge.date,
    },
  });
  if (duplicate) {
    //throw error
    const error = Error(
      "You have already logged progress on this date for this challenge!"
    );
    error.status = 401;
    throw error;
  }
});

DailyUserChallenge.beforeUpdate(async (dailyUserChallenge) => {
  try {
    const userChallenge = await dailyUserChallenge.getUserChallenge();
    const challenge = await userChallenge.getChallenge();

    //if challenge type is total, increment userChallenge.currentProgress with the new value
    if (challenge.goalType === "total") {
      const currProg = userChallenge.currentProgress;
      console.log("CURR PROG: ", currProg);
      console.log("DUC TOTAL: ", dailyUserChallenge.total);
      console.log("DUC PREV TOTAL: ", dailyUserChallenge.previous().total);
      userChallenge.update({
        currentProgress:
          Number(currProg) +
          Number(dailyUserChallenge.total) -
          Number(dailyUserChallenge.previous().total),
      });
    }

    //if challenge type is daily, check if daily goal has been met and if yes, increment userChallenge.currentProgress
  } catch (err) {
    console.log(err);
  }
});

// update progress
DailyUserChallenge.prototype.updateProgress = function (value) {
  try {
    return this.update({
      total: Number(this.total) + Number(value),
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = DailyUserChallenge;
