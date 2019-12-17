const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;

const db = require("./models");
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workoutdb", {
  useNewUrlParser: true
});

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

app.post("/submit", (req, res) => {
  db.Exercise.create(req.body)
    .then(createdExercise => {
      console.log(createdExercise);
      res.json({ success: true, data: createdExercise });
    })
    .catch(err => res.json({ success: false, err: err }));
});

app.get("/all", (req, res) => {
  db.Exercise.find()
    .then(foundExercises => {
      console.log(foundExercises);
      res.json({ success: true, data: foundExercises });
    })
    .catch(err => res.json({ success: false, err: err }));
});

app.get("/api/exercise/:id", (req, res) => {
  db.Exercise.findById(req.params.id)
    .then(foundExercise => {
      console.log(foundExercise);
      res.json({ success: true, data: foundExercise });
    })
    .catch(err => res.json({ success: false, err: err }));
});

app.put("/api/exercise/:id", (req, res) => {
  db.Exercise.findByIdAndUpdate(req.params.id, {
    type: req.body.type,
    name: req.body.name
  })
    .then(updatedExercise => {
      console.log(updatedExercise);
      res.json({ success: true, data: updatedExercise });
    })
    .catch(err => res.json({ success: false, err: err }));
});

//Starts the server
app.listen(PORT, () => {
  console.log("App running on port 3000!");
});
