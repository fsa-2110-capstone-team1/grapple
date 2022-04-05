const axios = require("axios");
const {
  models: { StravaWorkout },
} = require("../../server/db");

async function stravaSeed() {
  const stravaWorkouts = await Promise.all([
    StravaWorkout.create({
      startDate: new Date(),
      elapsedTime: 1800,
      type: "Run",
      distance: 1609.34,
      userId: 1,
    }),
    StravaWorkout.create({
      startDate: new Date(),
      elapsedTime: 1800,
      type: "Run",
      distance: 3200,
      userId: 1,
    }),
  ]);

  console.log(`seeded ${stravaWorkouts.length} Strava workouts`);

  return stravaWorkouts;
}

module.exports = stravaSeed;
