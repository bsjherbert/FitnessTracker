const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ExerciseSchema = new Schema({
  type: String,
  name: String
});
const Exercise = mongoose.model("Exercise", ExerciseSchema);
module.exports = Exercise;
