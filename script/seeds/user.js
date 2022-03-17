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
      username: "Ben123",
      email: "ben@hello.com",
      password: "123",
      firstName: "Ben",
      lastName: "Greenspan",
      isAdmin: true,
    }),
    User.create({
      username: "Kate123",
      email: "Kate@hello.com",
      password: "123",
      firstName: "Kate",
      lastName: "Svetlakova",
      isAdmin: true,
    }),
    User.create({
      username: "Louis123",
      email: "louis@hello.com",
      password: "123",
      firstName: "Louis",
      lastName: "Rabeno",
      isAdmin: true,
    }),
    User.create({
      username: "Marina123",
      email: "Marina@hello.com",
      password: "123",
      firstName: "Marina",
      lastName: "Chevis",
      isAdmin: true,
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
        image: user.picture.large,
      })
    )
  );

  console.log(`seeded ${users.length + fakeUsersCreated.length} users`);

  return users;
}

module.exports = userSeed;
