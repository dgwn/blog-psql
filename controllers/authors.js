const router = require("express").Router();

const { Blog } = require("../models");
const { sequelize } = require("../models/blog");

router.get("/", async (req, res) => {
  const authors = await Blog.findAll({
    group: "author",
    order: [[sequelize.fn("SUM", sequelize.col("likes")), "DESC"]],
    attributes: [
      "author",
      [sequelize.fn("COUNT", sequelize.col("title")), "articles"],
      [sequelize.fn("SUM", sequelize.col("likes")), "total_likes"]
    ]
  });
  res.json(authors);
});

module.exports = router;
