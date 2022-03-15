const Sequelize = require("sequelize");
const db = require("../../db");

const { STRING } = Sequelize;

const SubCategory = db.define("subCategory", {
  name: {
    type: STRING,
    unique: true,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  //categoryId
});

module.exports = SubCategory;
