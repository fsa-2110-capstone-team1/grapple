const Sequelize = require("sequelize");
const db = require("../db");

const {TEXT, STRING} = Sequelize;

const Badge = db.define("badge", {
    name: {
        type: STRING,
        unique: true,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      description: {
        type: TEXT,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      
   
 

});

module.exports = Badge;
