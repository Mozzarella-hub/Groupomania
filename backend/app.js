const express = require("express");
const app = express();

const helmet = require("helmet");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/user.routes");
const postsRoutes = require("./routes/post.routes");
const commentsRoutes = require("./routes/comment.routes");
const sequelize = require("./config/db");
const cors = require("cors");

app.use(helmet());
app.use(cors());

//gestion du cors

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*", "localhost");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use(bodyParser.urlencoded({ extended:true }));
app.use(bodyParser.json());

sequelize.initDb();

app.use("/api/user", userRoutes);
app.use("/api/post", postsRoutes);
app.use("/api/comment", commentsRoutes);


module.exports = app;