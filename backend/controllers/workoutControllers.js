const workout = require("../models/workoutModel");
const mongoose = require("mongoose");

//get all workouts
const getWorkouts = async (req, res) => {
    const workouts = await workout.find({}).sort({createdAt: -1});
    res.status(200).json(workouts);
}
// get single workut
const getWorkout = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
       return res.status(404).json({ error : "can not find the workout" });
    }

    const workouts = await workout.findById(id)

    if (!workouts) {
        return res.status(404).json({ error: "workout not found" });
    }
    res.status(200).json(workouts);
}

//create new workout

const createWorkout = async ( req, res) => {
    const { title, reps, loads } = req.body

    //add docs to the db
    try{
        const newWorkout = await workout.create({ title, reps, loads });
        res.status(200).json(newWorkout);
    }
    catch(error){
        res.status(400).json({error: error.message});
    }
}


//delete a single workout
const deleteWorkout = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
       return res.status(404).json({ error : "can not find the workout" });
    }
    const workouts = await workout.findOneAndDelete({_id : id});
    if (!workouts) {
        return res.status(404).json({ error: "workout not found" });
    }
    res.status(200).json(workouts);
}


//update single workout
const updateWorkout = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
       return res.status(404).json({ error : "can not find the workout" });
    }
    const workouts = await workout.findByIdAndUpdate({_id: id}, {
        ...req.body
    });
    if (!workouts) {
        return res.status(404).json({ error: "workout not found" });
    }
    res.status(200).json(workouts);
}


module.exports = {
    getWorkouts,
    getWorkout,
    createWorkout,
    deleteWorkout,
    updateWorkout
}