const Sequelize = require("sequelize");
const db = require("../db");

const {ENUM, STRING } = Sequelize;

const Connection = db.define("connection", {
  status: {
    type: ENUM('pending', 'accepted', 'rejected'),
  },
  requester_userId: {
    type: STRING,
  },
  requested_userId: {
    type: STRING,
  },
});

module.exports = Connection;