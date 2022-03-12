const {
  models: { User },
} = require("../../server/db");

async function userSeed() {
  // Creating Users
  const users = await Promise.all([
    User.create({
      username: 'cody',
      email: "cody@hello.com",
      password: "123",
      firstName: "Cody",
      lastName: "Williams",
      isPrivate: true,
      isAdmin: true,
    }),
    User.create({
      username: 'mary',
      email: "mary@hello.com",
      password: "123",
      firstName: "Mary",
      lastName: "Doe",
      isPrivate: true,
      
    }),
    User.create({
      username: 'john',
      email: "john@hello.com",
      password: "123",
      firstName: "John",
      lastName: "Brennan",
      isPrivate: true,
    }),
  ]);

  console.log(`seeded ${users.length} users`);

  return users;
}

module.exports = userSeed;
