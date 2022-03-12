const {
  models: { Challenge },
} = require("../../server/db/models");

const { dataChallenges } = require("../../server/db");

// Creating Challenges
async function challengeSeed() {
  const challenges = await Promise.all(
    dataChallenges.map((challenge) =>
      Challenge.create({
        id: challenge.id,
        name: challenge.name,
        description: challenge.description,
        image: challenge.image,
        type: challenge.type,
        categoryId: challenge.categoryId,
        subCategoryId: challenge.subCategoryId,
        startDateTime: challenge.startDateTime,
        endDateTime: challenge.endDateTime,
        targetNumber: challenge.targetNumber,
        targetUnit: challenge.targetUnit,
        difficulty: challenge.difficulty,
        isPrivate: challenge.isPrivate,
      })
    )
  );
  console.log(`seeded ${challenges.length} challenges`);

  return challenges;
}

module.exports = challengeSeed;