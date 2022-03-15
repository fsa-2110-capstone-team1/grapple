const Sequelize = require("sequelize");
const db = require("../../db");

const { TEXT } = Sequelize;

const UserImage = db.define("userImage", {
  imageURL: {
    type: TEXT,
    validate: {
      isUrl: true,
    },
  },
  //userId
});

module.exports = UserImage;
