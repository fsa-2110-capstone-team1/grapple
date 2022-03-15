const axios = require("axios");
const {
  models: { User },
} = require("../../server/db");

async function userSeed() {
  const { data: fakeUsers } = await axios.get(
    "https://randomuser.me/api/?results=97&inc=login,email,name,picture&seed=grapple&noinfo"
  );

  // Creating Users
  const users = await Promise.all([
    User.create({
      username: "cody",
      email: "cody@hello.com",
      password: "123",
      firstName: "Cody",
      lastName: "Williams",
      isAdmin: true,
    }),
    User.create({
      username: "mary",
      email: "mary@hello.com",
      password: "123",
      firstName: "Mary",
      lastName: "Doe",
    }),
    User.create({
      username: "john",
      email: "john@hello.com",
      password: "123",
      firstName: "John",
      lastName: "Brennan",
    }),
  ]);

  const fakeUsersCreated = await Promise.all(
    fakeUsers.results.map((user) =>
      User.create({
        username: user.login.username,
        email: user.email,
        password: user.login.password,
        firstName: user.name.first,
        lastName: user.name.last,
        image: user.picture.medium,
      })
    )
  );

  console.log(`seeded ${users.length + fakeUsersCreated.length} users`);

  return users;
}

module.exports = userSeed;
