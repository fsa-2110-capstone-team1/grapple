const Sequelize = require("sequelize");
const db = require("../db");

const { INTEGER, BOOLEAN, ENUM } = Sequelize;

const UserChallenge = db.define("userChallenge", {
  status: {
    type: ENUM("Not Started", "In Progress", "Completed"),
    defaultValue: "Not Started",
  },
  currentProgress: {
    type: INTEGER,
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
    //set to completed if progress >= target
    if (
      userChallenge.currentProgress >= challenge.targetNumber &&
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
      userChallenge.currentProgress < challenge.targetNumber &&
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

// update progress
UserChallenge.prototype.updateProgress = function (value) {
  try {
    return this.update({
      currentProgress: this.currentProgress + value * 1,
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = UserChallenge;
