//this is the access point for all things database related!

const db = require("./db");

const Challenge = require("./models/Challenge");
const Connection = require("./models/Connection");
const User = require("./models/User");
const UserChallenge = require("./models/UserChallenge");

//model associations go here

UserChallenge.belongsTo(User);
User.hasMany(UserChallenge);
UserChallenge.belongsTo(Challenge);
Challenge.hasMany(UserChallenge);
Connection.belongsTo(User);
User.hasMany(Connection);

module.exports = {
  db,
  models: {
    Challenge,
    Connection,
    User,
    UserChallenge,
  },
};
