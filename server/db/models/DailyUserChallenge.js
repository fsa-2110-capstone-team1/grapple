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

DailyUserChallenge.beforeCreate(async (dailyUserChallenge) => {
  try {
    const userChallenge = await dailyUserChallenge.getUserChallenge();
    const challenge = await userChallenge.getChallenge();

    //if challenge type is total, increment userChallenge.currentProgress with the new value
    if (challenge.goalType === "total") {
      const currProg = userChallenge.currentProgress;
      userChallenge.update({
        currentProgress: Number(currProg) + Number(dailyUserChallenge.total),
      });
    }

    //if challenge type is daily, check if daily goal has been met and if yes, increment userChallenge.currentProgress
    else if (challenge.goalType === "daily") {
      let updatedProgress;
      // +1 if we hit daily target now
      if (Number(dailyUserChallenge.total) >= Number(challenge.targetNumber)) {
        updatedProgress = 1;
      } else {
        updatedProgress = 0;
      }

      const currProg = userChallenge.currentProgress;
      userChallenge.update({
        currentProgress: Number(currProg) + updatedProgress,
      });
    }
  } catch (err) {
    console.log(err);
  }
});

DailyUserChallenge.beforeUpdate(async (dailyUserChallenge) => {
  try {
    const userChallenge = await dailyUserChallenge.getUserChallenge();
    const challenge = await userChallenge.getChallenge();

    //if challenge type is total, increment userChallenge.currentProgress with the new value
    if (challenge.goalType === "total") {
      const currProg = userChallenge.currentProgress;
      userChallenge.update({
        currentProgress:
          Number(currProg) +
          Number(dailyUserChallenge.total) -
          Number(dailyUserChallenge.previous().total),
      });
    }

    //if challenge type is daily, check if daily goal has been met and if yes, increment userChallenge.currentProgress
    else if (challenge.goalType === "daily") {
      let updatedProgress;
      // +1 if we hadn't hit the daily target before and hit it now
      if (
        Number(dailyUserChallenge.total) >= Number(challenge.targetNumber) &&
        Number(dailyUserChallenge.previous().total) <
          Number(challenge.targetNumber)
      ) {
        updatedProgress = 1;
        // -1 if we havent hit the target now and had previously hit it (backtracked score)
      } else if (
        Number(dailyUserChallenge.previous().total) >=
        Number(challenge.targetNumber)
      ) {
        updatedProgress = -1;
        // else do nothing
      } else {
        updatedProgress = 0;
      }

      const currProg = userChallenge.currentProgress;
      userChallenge.update({
        currentProgress: Number(currProg) + updatedProgress,
      });
    }
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
