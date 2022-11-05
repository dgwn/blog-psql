const router = require("express").Router();

const jwt = require("jsonwebtoken");
const { SECRET } = require("../util/config");

const ReadingList = require("../models/readingList");
const ActiveSession = require("../models/activeSessions");
const { User } = require("../models");

const tokenExtractor = (req, res, next) => {
  const authorization = req.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    try {
      req.decodedToken = jwt.verify(authorization.substring(7), SECRET);
    } catch {
      res.status(401).json({ error: "token invalid " });
    }
  } else {
    res.status(401).json({ error: "token missing" });
  }
  next();
};

router.post("/", async (req, res) => {
  try {
    const list = await ReadingList.create({
      ...req.body
    });
    return res.json(list);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.put("/:id", tokenExtractor, async (req, res) => {
  try {
    const user = await User.findByPk(req.decodedToken.id);
    const listItem = await ReadingList.findOne({
      where: { id: Number(req.params.id) }
    });
    const session = await ActiveSession.findOne({
      where: { user_id: Number(user.id) }
    });

    if (session) {
      if (listItem.userId == user.id) {
        if (user.disabled == false) {
          await listItem.update({ readStatus: req.body.read });
          return res.status(200).json({ message: "Marked as read" });
        } else {
          return res.status(404).json("user is disabled");
        }
      } else {
        return res
          .status(401)
          .json({ message: "Sorry, this is not your reading list" });
      }
    } else {
      return res.status(401).json({ message: "You must be logged in" });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json();
  }
});
module.exports = router;
