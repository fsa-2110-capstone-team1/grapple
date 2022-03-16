const Sequelize = require("sequelize");
const db = require("../db");

const { ENUM } = Sequelize;

const Connection = db.define("connection", {
  status: {
    type: ENUM("pending", "accepted"), //no 'rejected' because if rejected, we'll delete this entry
  },
});

module.exports = Connection;
