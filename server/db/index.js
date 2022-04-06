//this is the access point for all things database related!

const db = require("./db");

const StravaWorkout = require("./models/Strava");
const Challenge = require("./models/Challenge");
const Connection = require("./models/Connection");
const User = require("./models/User");
const UserChallenge = require("./models/UserChallenge");
const DailyUserChallenge = require("./models/DailyUserChallenge");

//model associations go here
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
DailyUserChallenge.belongsTo(UserChallenge);
UserChallenge.hasMany(DailyUserChallenge);
StravaWorkout.belongsTo(DailyUserChallenge);
DailyUserChallenge.hasMany(StravaWorkout);

module.exports = {
  db,
  models: {
    StravaWorkout,
    Challenge,
    Connection,
    User,
    UserChallenge,
    DailyUserChallenge,
  },
};
