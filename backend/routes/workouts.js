const express = require("express");
const {
  createWorkout,
  getAllWorkouts,
  getWorkout,
  deleteWorkout,
  updateWorkout,
} = require("../controllers/workoutControllers");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

// require auth for all workout routes
router.use(requireAuth);

// GET all workouts
router.get("/", getAllWorkouts);

// GET a single workouts
router.get("/:id", getWorkout);

// POST a new workouts
router.post("/", createWorkout);

// Delete a workouts
router.delete("/:id", deleteWorkout);

// UPDATE a workouts
router.patch("/:id", updateWorkout);

module.exports = router;
