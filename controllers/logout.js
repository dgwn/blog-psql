const router = require("express").Router();
const jwt = require("jsonwebtoken");
const { SECRET } = require("../util/config");

const User = require("../models/user");
const ActiveSession = require("../models/activeSessions");

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

router.delete("/", tokenExtractor, async (req, res) => {
  try {
    const user = await User.findByPk(req.decodedToken.id);
    const session = await ActiveSession.findOne({
      where: { user_id: Number(user.id) }
    });

    if (session) {
      if (session.user_id == user.id) {
        await session.destroy();
        return res.status(200).json({ message: "Logged out successfully" });
      } else {
        return res.status(401).json({ message: "Something went wrong" });
      }
    } else {
      return res.status(400).json({ message: "You are not logged in" });
    }
  } catch (error) {
    return res.status(400).json({ error });
  }
});

module.exports = router;
