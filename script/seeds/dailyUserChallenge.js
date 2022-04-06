const axios = require("axios");
const { differenceInCalendarDays } = require("date-fns");
const {
  models: { DailyUserChallenge, UserChallenge },
} = require("../../server/db");

async function dailyUserChallengeSeed() {
  // A few stable ones for easy QA

  const duc0 = await DailyUserChallenge.create({
    userChallengeId: 1,
    date: "03/02/2022",
  });
  const duc1 = await DailyUserChallenge.create({
    userChallengeId: 1,
    date: "03/03/2022",
  });
  const duc2 = await DailyUserChallenge.create({
    userChallengeId: 2,
    date: "03/02/2022",
  });
  const duc3 = await DailyUserChallenge.create({
    userChallengeId: 2,
    date: "03/03/2022",
    // total: 12,
  });

  await duc0.updateProgress(10);
  await duc2.updateProgress(10);
  await duc1.updateProgress(8);

  const userChallenges = await UserChallenge.findAll({
    include: ["challenge"],
  });

  //only add daily challenge to in progress or past challenges
  // skip user challenge 1 & 2 because of fixed seeding above
  const nonFutureUserChallenges = userChallenges.filter(
    (uc) =>
      new Date(uc.challenge.startDateTime) <= new Date() &&
      uc.id !== 1 &&
      uc.id !== 2
  );

  function randomDate(date1, date2) {
    function randomValueBetween(min, max) {
      return Math.random() * (max - min) + min;
    }
    var date1 = date1 || "01-01-1970";
    var date2 = date2 || new Date().toLocaleDateString();
    date1 = new Date(date1).getTime();
    date2 = new Date(date2).getTime();
    if (date1 > date2) {
      return new Date(randomValueBetween(date2, date1)).toLocaleDateString();
    } else {
      return new Date(randomValueBetween(date1, date2)).toLocaleDateString();
    }
  }

  function padTo2Digits(num) {
    return num.toString().padStart(2, "0");
  }

  function formatDate(date) {
    return [
      padTo2Digits(date.getMonth() + 1),
      padTo2Digits(date.getDate()),
      date.getFullYear(),
    ].join("/");
  }

  function addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return formatDate(result, "mediumDate");
  }

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  const ducs = await Promise.all(
    nonFutureUserChallenges.map(async (uc, idx) => {
      const endDate = new Date(
        Math.min(new Date(uc.challenge.endDateTime), new Date())
      );

      const challengeLength = differenceInCalendarDays(
        endDate,
        new Date(uc.challenge.startDateTime)
      );

      //add daily seed to 1/2s of challenges to have a few empty examples
      if (idx % 2 === 0) {
        let date = uc.challenge.startDateTime;

        for (let i = 0; i < getRandomInt(7, challengeLength); i++) {
          await DailyUserChallenge.create({
            userChallengeId: uc.id,
            date: addDays(date, i),
            total:
              uc.challenge.goalType === "total"
                ? uc.challenge.targetUnit === "days"
                  ? 1
                  : getRandomInt(1, uc.challenge.targetNumber / challengeLength)
                : getRandomInt(1, uc.challenge.targetNumber),
          });
        }
      }

      //add daily seed to another ~1/3s of challenges to be completed
      else if (idx % 3 === 0) {
        let date = uc.challenge.startDateTime;

        for (let i = 0; i < challengeLength; i++) {
          await DailyUserChallenge.create({
            userChallengeId: uc.id,
            date: addDays(date, i),
            total:
              uc.challenge.goalType === "total"
                ? uc.challenge.targetUnit === "days"
                  ? 1
                  : uc.challenge.targetNumber / challengeLength
                : uc.challenge.targetNumber,
          });
        }
      }
    })
  );

  console.log(`seeded ${4 + ducs.length} dailyUserChallenges`);

  return ducs;
}

module.exports = dailyUserChallengeSeed;
