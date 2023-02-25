require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const workoutRoutes = require("./routes/workout");
mongoose.set("strictQuery", false);

// express app
const app = express();

// middleware
//? Parsing data into JSON
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

//* This is the previous route, before changing to the one below
//! Route BEFORE
// app.get("/", (req, res) => {
//   res.json({ message: "Hello World" });
// });

//TODO: Move the route into different files called routes.js

// routes
//! Route AFTER => this is the middleware to handle route and make it readable
app.use("/api/workouts", workoutRoutes);

// connect to db
//* Connect to database after the route line
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log("connected to db and listening for" + " " + process.env.PORT);
    });
  })
  .catch((err) => console.log(err));
