const axios = require("axios");
const {
  models: { DailyUserChallenge },
} = require("../../server/db");

async function dailyUserChallengeSeed() {
  const duc = await Promise.all([
    DailyUserChallenge.create({
      userChallengeId: 1,
      date: "03/02/2022",
    }),
    DailyUserChallenge.create({
      userChallengeId: 1,
      date: "03/03/2022",
    }),
  ]);

  await duc[0].updateProgress(10);
  await duc[1].updateProgress(8);

  console.log(`seeded ${duc.length} dailyUserChallenges`);

  return duc;
}

module.exports = dailyUserChallengeSeed;