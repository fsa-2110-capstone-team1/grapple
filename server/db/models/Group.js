const Sequelize = require("sequelize");
const db = require("../db");

const {STRING, BOOLEAN} = Sequelize;

const Group = db.define("group", {
  groupName: {
    type: STRING,
    // unique: true,?
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  isPrivate: {
  type: BOOLEAN,
  defaultValue: false,
  }
  
    
});

module.exports = Group;
