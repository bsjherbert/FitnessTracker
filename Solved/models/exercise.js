const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ExerciseSchema = new Schema({
  exerciseType: String,
  exerciseName: String
});
const Exercise = mongoose.model("Exercise", ExerciseSchema);
module.exports = Exercise;