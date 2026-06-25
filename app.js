const dns = require("dns");

dns.setServers([
  "8.8.8.8",
  "8.8.4.4"
]);

require("dotenv").config();

const express = require("express");
const connectDB = require("./config/db");
const path = require("path");
const session = require("express-session");

const authRoutes = require("./routes/authRoutes");
const gameRoutes = require("./routes/gameRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

connectDB();

app.use(
  session({
    secret: process.env.SESSION_SECRET || "letsgameaboutit",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set("view engine", "ejs");

app.use((req, res, next) => {
  res.locals.user = req.session?.user || null;
  next();
});

app.use(authRoutes);
app.use(gameRoutes);
app.use(reviewRoutes);
app.use(userRoutes);

app.listen(process.env.PORT, () => {
  console.log("Servidor rodando");
});