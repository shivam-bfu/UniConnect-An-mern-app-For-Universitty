const express = require("express");
const cors = require("cors");
const path = require("path");
const passport = require("passport");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const app = express();

// Models
const userModel = require("./models/UserModel");
const profModel = require("./models/profModel");
const allumni =require('./models/allumni')
// Routes
const indexRouter = require("./routes/indexRouter");
const postRouter = require("./routes/postRoute");
const profRouter = require("./routes/profRouter");

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:5173", credentials: true })); // Allow frontend
app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");

app.use(passport.initialize());

// Use Routes
app.use("/", indexRouter);
app.use("/post", postRouter);
app.use("/prof", profRouter);

const PORT = 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
