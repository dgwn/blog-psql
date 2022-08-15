const { Model, DataTypes } = require("sequelize");

const { sequelize } = require("../util/db");

class Blog extends Model {}
Blog.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    author: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    url: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    likes: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    yearWritten: {
      type: DataTypes.INTEGER,
      validate: {
        isInYearRange(value) {
          const currentYear = new Date().getFullYear();
          if (parseInt(value) < 1991 || parseInt(value) > currentYear) {
            throw new Error("Year must be between 1991 and present");
          }
        }
      }
    }
  },
  {
    sequelize,
    underscored: true,
    timestamps: true,
    modelName: "blog"
  }
);

module.exports = Blog;
