var express = require("express");
var mongoose = require("mongoose");
var app = express();

var allowCrossDomain = function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
};

app.use(allowCrossDomain);

app.listen(3000, () => {
  console.log("Server running on port 3000");

  // Initialize DB
  mongoose.connect("mongodb://localhost/assignment");
  return mongoose.model(
    "User",
    new mongoose.Schema({
      name: String,
      email: String,
      password: String,
      userType: String,
    })
  );
});

app.post("/users", function (req, res) {
  const User = mongoose.models.User;

  User(req.body).create(function (err) {
    if (err) throw err;
    res.json({ success: true, message: "user saved successfully" });
  });
});

app.get("/users", function (req, res) {
  const User = mongoose.models.User;

  User.find({ email: req.query.email }, function (err, docs) {
    if (err) throw err;
    res.json({ success: true, users: docs });
  });
});
