const express = require("express");
const router = express.Router()
const {
    createWorkout,
    getWorkouts,
    getWorkout,
    deleteWorkout,
    updateWorkout
} = require("../controllers/workoutControllers")


// get all workouts
router.get('/', getWorkouts)

//get single workouts
router.get('/:id', getWorkout)

//POST a single workout
router.post("/", createWorkout)

//DELETE a single workout
router.delete('/:id', deleteWorkout)

//UPDATE a single workout
router.patch('/:id', updateWorkout)

module.exports = router