const axios = require("axios");
const {
  models: { Connection },
} = require("../../server/db");

async function connectionSeed() {
  function getRandomNum(min, max, dec) {
    return (Math.random() * (max - min) + min).toFixed(dec); //The maximum is exclusive and the minimum is inclusive
  }

  const status = ["pending", "accepted"];

  const array = new Array(100).fill("");

  const connections = await Promise.all(
    array.map((conn) =>
      Connection.create({
        requester_userId: getRandomNum(1, 100, 0),
        requested_userId: getRandomNum(1, 100, 0),
        status: status[getRandomNum(0, 1, 0)],
      })
    )
  );

  console.log(`seeded ${connections.length} connections`);

  return connections;
}

module.exports = connectionSeed;
