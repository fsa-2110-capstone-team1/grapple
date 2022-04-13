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
        "https://img.icons8.com/external-avatar-andi-nur-abdillah/344/external-avatar-business-avatar-circle-avatar-andi-nur-abdillah-18.png",
      stravaRefreshToken: "5d0a14c4e408ef5ea25667d9f2c1d04f6982788c",
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
        "https://img.icons8.com/external-avatar-andi-nur-abdillah/344/external-avatar-business-avatar-circle-avatar-andi-nur-abdillah.png",
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
