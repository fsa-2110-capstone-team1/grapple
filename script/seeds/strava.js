const {
  models: { StravaWorkout },
} = require("../../server/db");

async function stravaSeed() {
  const stravaWorkouts = await Promise.all([
    StravaWorkout.create({
      stravaExternalId: "fakeExternalId1",
      startDate: new Date(),
      elapsedTime: 1800, //30mins
      type: "Yoga",
      distance: 1609.34,
      dailyUserChallengeId: 1,
    }),
    StravaWorkout.create({
      stravaExternalId: "fakeExternalId2",
      startDate: new Date(),
      elapsedTime: 1800, //30mins
      type: "Run",
      distance: 17702.8,
      dailyUserChallengeId: 4,
    }),
  ]);

  console.log(`seeded ${stravaWorkouts.length} Strava workouts`);

  return stravaWorkouts;
}

module.exports = stravaSeed;
