const Blog = require("./blog");
const User = require("./user");
const ReadingList = require("./readingList");

User.hasMany(Blog);
Blog.belongsTo(User);

Blog.belongsToMany(User, { through: ReadingList, as: "readings" });
User.belongsToMany(Blog, { through: ReadingList, as: "readings" });

Blog.hasMany(ReadingList);
ReadingList.belongsTo(User);

module.exports = {
  Blog,
  User,
  ReadingList
};
