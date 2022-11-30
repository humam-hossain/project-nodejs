// server
const path = require("path");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");

// util
const rootDir = require("./util/path");
const mongoConnect = require("./util/database").mongoConnect;

// models
const User = require("./models/user");

// controllers
const errorControllers = require("./controllers/error");

// routes
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(rootDir, "public"))); // publicly accessibile directory

app.use((req, res, next) => {
  User.findById("638045c7944f3e54a48a9ff0")
    .then((user) => {
        req.user = new User(user.name, user.email, user.cart, user._id);
        next();
    })
    .catch((err) => {
      console.log("server.js/app.use()/User.findById() failed!");
      console.log(err);
    });
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorControllers.get404);

mongoConnect(() => {
  app.listen(3000);
});
