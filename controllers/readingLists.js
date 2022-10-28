const router = require("express").Router();

const ReadingList = require("../models/readingList");

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

module.exports = router;
