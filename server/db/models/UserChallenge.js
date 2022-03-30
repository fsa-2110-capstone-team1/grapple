const Sequelize = require("sequelize");
const db = require("../db");

const { DECIMAL, ENUM } = Sequelize;

const UserChallenge = db.define("userChallenge", {
  status: {
    type: ENUM("Not Started", "In Progress", "Completed"),
    defaultValue: "Not Started",
  },
  // current progress is either:
  // daily challenges: number of days where goal has been completed
  // total challenges: sum of daily value
  currentProgress: {
    type: DECIMAL,
    validate: {
      min: 0,
    },
    defaultValue: 0,
  },
  // userId
  // challengeId
});

// dont allow duplicate userId/challengeId (ie dont allow joining the same challenge twice unless they drop out first)
UserChallenge.beforeCreate(async (userChallenge) => {
  const duplicate = await UserChallenge.findOne({
    where: {
      challengeId: userChallenge.challengeId,
      userId: userChallenge.userId,
    },
  });
  //set to completed if progress >= target
  if (duplicate) {
    //throw error
    const error = Error("You have already joined this challenge!");
    error.status = 401;
    throw error;
  }
});

//  update status based on challenge dates and current progress vs. target goal
UserChallenge.beforeUpdate(async (userChallenge) => {
  try {
    const challenge = await userChallenge.getChallenge();
    let target;
    if (challenge.goalType === "total") {
      target = challenge.targetNumber;
    } else {
      target = challenge.endDateTime - challenge.startDateTime;
    }

    //set to completed if progress >= target
    if (
      userChallenge.currentProgress >= target &&
      userChallenge.status !== "Completed"
    ) {
      userChallenge.update({ status: "Completed" });
      //set to in progress if progress > 0 and it hadn't been started yet
    } else if (
      userChallenge.currentProgress > 0 &&
      userChallenge.status === "Not Started"
    ) {
      userChallenge.update({ status: "In Progress" });
      //set to in progress if it had previously been completed but user backtracked value
    } else if (
      userChallenge.currentProgress > 0 &&
      userChallenge.currentProgress < target &&
      userChallenge.status !== "In Progress"
    ) {
      userChallenge.update({ status: "In Progress" });
      //set to not started if it had previously been started but user backtracked value to 0
    } else if (
      userChallenge.currentProgress <= 0 &&
      userChallenge.status !== "Not Started"
    ) {
      userChallenge.update({ status: "Not Started" });
      //set to in progress if it had previously been completed but user backtracked value
    }
  } catch (err) {
    console.log(err);
  }
});

// update progress -- TO BE DELETED
UserChallenge.prototype.updateProgress = function (value) {
  try {
    return this.update({
      currentProgress: Number(this.currentProgress) + Number(value),
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = UserChallenge;
