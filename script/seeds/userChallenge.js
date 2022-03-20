const {
  models: { UserChallenge, User, Challenge },
} = require("../../server/db");

const Sequelize = require("sequelize");

const { dataChallenges } = require("./challenge");
const { users } = require("./user");

const getChallengeLength = (d1, d2) => {
  const date1 = new Date(d1);
  const date2 = new Date(d2);
  const diffTime = Math.abs(date2 - date1);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

async function userChallengeSeed() {
  // Creating userChallenge

  // Selecting all user exept user with id: 1, to have user without challenges
  const users = await User.findAll({
    where: {
      id: {
        [Sequelize.Op.not]: 1,
      },
    },
  });
  const challenges = await Challenge.findAll();

  const userAmountOfChellenges = {};
  const challengeLength = {};
  const usersIdWithChallengeId = {};
  //creating object with {userId: "amount of chellenges"} pair
  users.forEach(
    (user) => (userAmountOfChellenges[user.id] = getRandomInt(1, 10))
  );
  //creating object with {chellengeId: "length of the chellenge"} pair
  challenges.forEach(
    (challenge) =>
      (challengeLength[challenge.id] = getChallengeLength(
        challenge.startDateTime,
        challenge.endDateTime
      ))
  );
  //creating nested object {userId: { challengeId: "current progress"}}
  for (const userId in userAmountOfChellenges) {
    let amountOfChallenges = userAmountOfChellenges[userId];
    usersIdWithChallengeId[userId] = [];
    let storage = [];
    while (amountOfChallenges > 0) {
      challengeId = getRandomInt(1, challenges.length);
      if (!storage.includes(challengeId)) {
        storage.push(challengeId);
        let obj = {};
        obj[challengeId] = getRandomInt(1, challengeLength[challengeId]);
        usersIdWithChallengeId[userId].push(obj);
        amountOfChallenges--;
      }
    }
  }
  const userChallenges = [];

  //seeding data userChallenges
  for (userId in usersIdWithChallengeId) {
    usersIdWithChallengeId[userId].map((user) => {
      userChallenges.push(
        new Promise((resolve) => {
          resolve(
            UserChallenge.create({
              currentProgress: Object.entries(user)[0][1],
              userId: userId,
              challengeId: Object.entries(user)[0][0],
            })
          );
        })
      );
    });
  }

  await Promise.all(userChallenges);

  console.log(`seeded ${userChallenges.length} users challenges`);

  return userChallenges;
}

module.exports = userChallengeSeed;
