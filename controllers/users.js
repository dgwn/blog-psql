const router = require("express").Router();
const { User } = require("../models");
const { Blog } = require("../models");

const { Op } = require("sequelize");

const errorHandler = (error, req, res, next) => {
  console.error(`Error(s): [${error.message}]`);
  res.status(400).json({ error });
  next();
};

router.get("/", async (req, res) => {
  const users = await User.findAll({
    include: {
      model: Blog,
      attributes: { exclude: ["userId"] }
    }
  });
  res.json(users);
});

router.get("/:id", async (req, res) => {
  let readStatus = {
    [Op.in]: [true, false]
  };
  if (req.query.read) {
    readStatus = req.query.read === "true";
  }

  const user = await User.findOne({
    attributes: { exclude: ["id", "createdAt", "updatedAt"] },
    include: {
      model: Blog,
      as: "readings",
      attributes: { exclude: ["userId", "createdAt", "updatedAt"] },

      through: {
        attributes: ["id", "readStatus"],
        where: {
          readStatus
        }
      }
    },
    where: { id: req.params.id }
  });
  res.json(user);
});

router.post("/", async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.json(user);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

router.put("/:username", async (req, res) => {
  const user = await User.findOne({ where: { username: req.params.username } });
  if (user) {
    await user.update({ username: req.body.username });
    return res.json(user);
  } else {
    res.status(404).end();
  }
});

router.use(errorHandler);

module.exports = router;
