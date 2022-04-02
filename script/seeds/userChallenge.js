const {
  models: { UserChallenge, User, Challenge },
} = require("../../server/db");

const Sequelize = require("sequelize");

async function userChallengeSeed() {
  // Creating a couple of stable userChallenges for QA ease
  await UserChallenge.create({
    userId: 1,
    challengeId: 1,
  });

  await UserChallenge.create({
    userId: 1,
    challengeId: 2,
  });

  // Selecting all users
  const users = await User.findAll();
  const challenges = await Challenge.findAll();

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  //seeding data userChallenges
  await Promise.all(
    users.map(async (user) => {
      let thisUsersChallengeIds = [];
      let challengeIds = challenges
        .map((chal) => chal.id)
        .sort((a, b) => a - b);
      for (let i = 0; i < 5; i++) {
        let challengeId =
          challengeIds[getRandomInt(0, challengeIds.length - 1)];
        if (!thisUsersChallengeIds.find((ucid) => ucid === challengeId)) {
          const uc = await UserChallenge.create({
            userId: user.id,
            challengeId,
          });
          thisUsersChallengeIds.push(uc.challengeId);
        }
      }
    })
  );

  console.log(`seeded several users challenges`);

  return "all done";
}

module.exports = userChallengeSeed;
