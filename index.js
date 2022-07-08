// const { Sequelize, Model, DataTypes, QueryTypes } = require("sequelize");
const express = require("express");
const app = express();

const { PORT } = require('./util/config')
const { connectToDatabase } = require('./util/db')

const blogsRouter = require('./controllers/blogs')

app.use(express.json())
app.use('/api/blogs', blogsRouter)

const start = async () => {
  await connectToDatabase()
  app.listen(PORT, () => {console.log(`Server running on port ${PORT}`)})
}

start()

// const sequelize = new Sequelize(process.env.DATABASE_URL, {
//   dialectOptions: {
//     ssl: {
//       require: true,
//       rejectUnauthorized: false,
//     },
//   },
// });

// class Blog extends Model {}
// Blog.init(
//   {
//     id: {
//       type: DataTypes.INTEGER,
//       primaryKey: true,
//       autoIncrement: true,
//     },
//     author: {
//       type: DataTypes.TEXT,
//       allowNull: true,
//     },
//     url: {
//       type: DataTypes.TEXT,
//       allowNull: false,
//     },
//     title: {
//       type: DataTypes.TEXT,
//       allowNull: false,
//     },
//     likes: {
//       type: DataTypes.INTEGER,
//       defaultValue: 0
//     }
//   },
//   {
//     sequelize,
//     underscored: true,
//     timestamps: false,
//     modelName: "blog",
//   }
// );

// app.get("/api/blogs", async (req, res) => {
//   const blogs = await Blog.findAll();
//   res.json(blogs);
// });

// app.use(express.json());

// app.post("/api/blogs", async (req, res) => {
//   try {
//     const blog = await Blog.create(req.body);
//     return res.json(blog);
//   } catch (error) {
//     return res.status(400).json({ error });
//   }
// });

// app.delete("/api/blogs/:id", async (req, res) => {
//   try {
//     const blog = await Blog.findOne({where: {id: Number(req.params.id)}})
//     if (blog) {
//       await blog.destroy({where: {id: Number(req.params.id)}})
//       return (res.status(200).json({ message: "Resource Deleted" }))
//     }
//     return(res.status(404).json({ message: "Resource does not exist"}))
//   } catch (error) {
//     return res.status(400).json({ error });
//   }
// })

// const PORT = process.env.PORT || 3001;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

// const main = async () => {
//   try {
//     await sequelize.authenticate()

//     // const blogs = await sequelize.query("SELECT * FROM blogs", {type: QueryTypes.SELECT})
//     // console.log(blogs)

//     // sequelize.close()
//   } catch (error) {
//     console.error('Unable to connect to the database:', error)
//   }
// }

// main()
