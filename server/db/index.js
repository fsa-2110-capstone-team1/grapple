//this is the access point for all things database related!

const db = require("./db");

const Badge = require("./models/Badge");
const Category = require("./models/Category");
const Challenge = require("./models/Challenge");
const ChallengeUnit = require("./models/ChallengeUnit");
const Connection = require("./models/Connection");
const DifficultyPoints = require("./models/DifficultyPoints");
const Group = require("./models/Group");
const SubCategory = require("./models/SubCategory");
const User = require("./models/User");
const UserBadge = require("./models/UserBadge");
const UserChallenge = require("./models/UserChallenge");
const UserChallengeUnit = require("./models/UserChallengeUnit");
const UserGroup = require("./models/UserGroup");
const UserImage = require("./models/UserImage");

//model associations go here

UserImage.belongsTo(User);
UserBadge.belongsTo(User);
User.hasMany(UserBadge);

UserBadge.belongsTo(Badge);
Badge.hasMany(UserBadge);

UserGroup.belongsTo(User);
User.hasMany(UserGroup);
UserGroup.belongsTo(Group);
Group.hasMany(UserGroup);

UserChallenge.belongsTo(User);
User.hasMany(UserChallenge);
UserChallenge.belongsTo(Challenge);
Challenge.hasMany(UserChallenge);

UserChallengeUnit.belongsTo(UserChallenge);
UserChallenge.hasMany(UserChallengeUnit);

UserChallengeUnit.belongsTo(ChallengeUnit);
ChallengeUnit.hasMany(UserChallengeUnit);

ChallengeUnit.belongsTo(Challenge);
Challenge.hasMany(ChallengeUnit);

DifficultyPoints.belongsTo(Challenge);
// Challenge.hasMany(DifficultyPoints);

Challenge.belongsTo(Category);
Category.hasMany(Challenge);

Challenge.belongsTo(SubCategory);
SubCategory.hasMany(Challenge);

SubCategory.belongsTo(Category);
Category.hasMany(SubCategory);

Connection.belongsTo(User);
User.hasMany(Connection);

module.exports = {
  db,
  models: {
    Badge,
    Category,
    Challenge,
    ChallengeUnit,
    Connection,
    DifficultyPoints,
    Group,
    SubCategory,
    User,
    UserBadge,
    UserChallenge,
    UserChallengeUnit,
    UserGroup,
    UserImage,
  },
};
