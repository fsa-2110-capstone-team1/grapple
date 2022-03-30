//this is the access point for all things database related!

const db = require("./db");

const Strava = require("./models/Strava");
const Challenge = require("./models/Challenge");
const Connection = require("./models/Connection");
const User = require("./models/User");
const UserChallenge = require("./models/UserChallenge");

//model associations go here

Strava.belongsTo(User);
User.hasOne(Strava);
UserChallenge.belongsTo(User);
User.hasMany(UserChallenge);
UserChallenge.belongsTo(Challenge);
Challenge.hasMany(UserChallenge);
User.hasOne(Connection, {
  as: "requester_user",
  foreignKey: "requester_userId",
});
User.hasOne(Connection, {
  as: "requested_user",
  foreignKey: "requested_userId",
});

module.exports = {
  db,
  models: {
    Strava,
    Challenge,
    Connection,
    User,
    UserChallenge,
  },
};
