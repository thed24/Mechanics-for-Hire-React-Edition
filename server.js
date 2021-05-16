var express = require("express");
var session = require("express-session");
var mongoose = require("mongoose");
var app = express();
var User;

var allowCrossDomain = function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3001");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
};

app.use(allowCrossDomain);
app.use(express.json());
app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: "XCR3rsasa%RDHHH",
    cookie: { maxAge: 600000000 },
  })
);

app.listen(3000, () => {
  console.log("Server running on port 3000");

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

app.post("/auth", function (req, res) {
  User.find({}, function (err, docs) {
    if (err) throw err;

    const user = docs.find((doc) => doc.email === req.body.email);
    if (!user) {
      res.status(403).json({
        success: false,
        message: "failed to find account with given email",
      });
      return;
    }

    if (user.password === req.body.password) {
      req.session.loggedin = true;
      req.session.email = req.body.email;
      res.json({ 
        success: true, 
        message: "successfully authenticated",
        session: req.session
      });
    } else {
      res.status(403).json({
        success: false,
        message: "failed to authenticate",
      });
    }
  });
});

app.get("/auth", function (req, res) {
  if (req.session.loggedin) {
    res.json({
      success: true,
      message: "you are currently authenticated",
      email: req.session.email,
    });
  } else {
    res.status(403).json({
      success: false,
      message: "you are currently not authenticated!",
    });
  }
});

app.post("/users", function (req, res) {
  User.create(req.body, function (err) {
    if (err) throw err;
    res.json({ success: true, message: "user created successfully" });
  });
});

app.get("/users", function (req, res) {
  User.find({}, function (err, docs) {
    if (err) throw err;
    res.json({ success: true, users: docs });
  });
});
