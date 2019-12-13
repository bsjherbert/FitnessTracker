const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;

const db = require("./models");
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workoutdb", { useNewUrlParser: true });

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

app.post("/submit", (req, res) => {
  console.log(req.body);
  //reference mongoose docs to find the create method
});
app.get("/all", (req, res) => {
  //reference mongoose docs to find the read method 
});
app.post("/update/:id", (req, res) => {
  //reference mongoose docs to find the update method
});
//COMPLETELY OPTIONAL
app.delete("/delete/:id", (req, res) => {
  //reference mongoose docs to find the delete method
});
//Starts the server
app.listen(PORT, () => {
  console.log("App running on port 3000!");
});
