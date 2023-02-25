const Workout = require("../models/workoutModel");
const mongoose = require("mongoose");

//! PROMISE, REMEMBER TO USE ASYNC/AWAIT

//? GET all workouts
const getAllWorkouts = async (req, res) => {
  //* Find all documents in the collection and Sort them by createdAt in descending order
  const workouts = await Workout.find({}).sort({ createdAt: -1 });
  //* Send the response
  res.status(200).json(workouts);
};

//? GET single workout
const getSingleWorkout = async (req, res) => {
  //* Get the id from the request
  const { id } = req.params;

  //* Check if the id is valid
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No Such Workout" });
  }

  //* Find the workout by id
  const workout = await Workout.findById(id);
  //* If workout is not found, return 404
  if (!workout) {
    return res.status(404).json({ error: "Workout not found" });
  }
  //* Send the response if workout is found
  res.status(200).json(workout);
};

//? POST a new workout

const createWorkout = async (req, res) => {
  const { title, reps, load } = req.body;

  //! Add DOC to database
  try {
    const workout = await Workout.create({ title, reps, load });
    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//? DELETE a workout
const deleteWorkout = async (req, res) => {
  const { id } = req.params;

  //* Check if the id is valid
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No Such Workout" });
  }

  //* Delete the workout by id
  const workout = await Workout.findOneAndDelete({ _id: id });
  //* If workout is not found, return 404
  if (!workout) {
    return res.status(404).json({ error: "Workout not found" });
  }
  //* Send the response if workout is found
  res.status(200).json(workout);
};

//? UPDATE/PATCH a workout
const updateWorkout = async (req, res) => {
  const { id } = req.params;

  //* Check if the id is valid
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No Such Workout" });
  }

  const workout = await Workout.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  //* If workout is not found, return 404
  if (!workout) {
    return res.status(404).json({ error: "Workout not found" });
  }
  //* Send the response if workout is found
  res.status(200).json(workout);
};

module.exports = {
  createWorkout,
  getAllWorkouts,
  getSingleWorkout,
  deleteWorkout,
  updateWorkout,
};
