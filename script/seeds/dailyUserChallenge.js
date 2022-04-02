const axios = require("axios");
const { differenceInCalendarDays } = require("date-fns");
const {
  models: { DailyUserChallenge, UserChallenge },
} = require("../../server/db");

async function dailyUserChallengeSeed() {
  // A few stable ones for easy QA
  const duc = await Promise.all([
    DailyUserChallenge.create({
      userChallengeId: 1,
      date: "03/02/2022",
    }),
    DailyUserChallenge.create({
      userChallengeId: 1,
      date: "03/03/2022",
    }),
    DailyUserChallenge.create({
      userChallengeId: 2,
      date: "03/02/2022",
    }),
    DailyUserChallenge.create({
      userChallengeId: 2,
      date: "03/03/2022",
      total: 12,
    }),
  ]);

  await duc[0].updateProgress(10);
  await duc[2].updateProgress(10);
  await duc[1].updateProgress(8);

  const userChallenges = await UserChallenge.findAll({
    include: ["challenge"],
  });
  const nonFutureUserChallenges = userChallenges.filter(
    (uc) => uc.challenge.status !== "Not Started"
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
      //add daily seed to 2/3s of challenges to have a few empty examples
      if (idx % 2 === 1) {
        let date = randomDate(
          uc.challenge.startDateTime,
          uc.challenge.endDateTime
        );
        for (let i = 0; i < 4; i++) {
          await DailyUserChallenge.create({
            userChallengeId: uc.id,
            date: addDays(date, i),
            total:
              uc.challenge.goalType === "total"
                ? uc.challenge.targetUnit === "days"
                  ? 1
                  : getRandomInt(
                      1,
                      uc.challenge.targetNumber /
                        differenceInCalendarDays(
                          new Date(uc.challenge.endDateTime),
                          new Date(uc.challenge.startDateTime)
                        )
                    )
                : getRandomInt(1, uc.challenge.targetNumber),
          });
        }
      }
    })
  );

  console.log(`seeded ${duc.length + ducs.length} dailyUserChallenges`);

  return duc;
}

module.exports = dailyUserChallengeSeed;
