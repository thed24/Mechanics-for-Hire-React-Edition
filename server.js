var express = require("express");
var mongoose = require("mongoose");
var User;
var app = express();

var allowCrossDomain = function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
};

app.use(allowCrossDomain);
app.use(express.json());

app.listen(3000, () => {
  console.log("Server running on port 3000");

  // Initialize DB
  mongoose.connect("mongodb://localhost/assignment", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  User = mongoose.model(
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
  console.log(req.body);
  User.create(req.body, function (err) {
    if (err) throw err;
    res.json({ success: true, message: "user saved successfully" });
  });
});

app.get("/users", function (req, res) {
  User.find({ email: req.query.email }, function (err, docs) {
    if (err) throw err;
    res.json({ success: true, users: docs });
  });
});
