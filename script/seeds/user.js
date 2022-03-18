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
      username: "ben123",
      email: "ben@hello.com",
      password: "123",
      firstName: "Ben",
      lastName: "Greenspan",
      isAdmin: true,
      image: "https://cdn-icons-png.flaticon.com/512/4333/4333609.png",
    }),
    User.create({
      username: "kate123",
      email: "kate@hello.com",
      password: "123",
      firstName: "Kate",
      lastName: "Svetlakova",
      isAdmin: true,
      image:
        "https://cdn-icons.flaticon.com/png/512/924/premium/924915.png?token=exp=1647634538~hmac=2b097f5fdd85ff2873aec831485e3987",
    }),
    User.create({
      username: "louis123",
      email: "louis@hello.com",
      password: "123",
      firstName: "Louis",
      lastName: "Rabeno",
      isAdmin: true,
      image: "https://cdn-icons-png.flaticon.com/512/4128/4128176.png",
    }),
    User.create({
      username: "marina123",
      email: "marina@hello.com",
      password: "123",
      firstName: "Marina",
      lastName: "Chevis",
      isAdmin: true,
      image:
        "https://cdn-icons.flaticon.com/png/512/4140/premium/4140047.png?token=exp=1647634484~hmac=3b435ab031b37c4afff01d191a7816e6",
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
