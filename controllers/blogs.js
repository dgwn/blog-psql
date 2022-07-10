const router = require('express').Router()

const { Blog } = require('../models')

router.get("/", async (req, res) => {
  const blogs = await Blog.findAll();
  res.json(blogs);
});


router.post("/", async (req, res) => {
  try {
    const blog = await Blog.create(req.body);
    return res.json(blog);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const blog = await Blog.findOne({where: {id: Number(req.params.id)}})
    if (blog) {
      await blog.destroy()
      return (res.status(200).json({ message: "Resource Deleted" }))
    }
    return(res.status(404).json({ message: "Resource does not exist"}))
  } catch (error) {
    return res.status(400).json({ error });
  }
})

router.put("/:id", async (req, res) => {
  try {
    const blog = await Blog.findOne({where: {id: Number(req.params.id)}})
    if (blog) {
      await blog.update({likes: req.body.likes})
      return res.json(blog);
    }
    return(res.status(404).json({ message: "Resource does not exist"}))
  } catch (error) {
    return res.status(400).json({ error });
  }
})

module.exports = router