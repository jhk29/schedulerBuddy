const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

const users = require("./routes/api/users");

const app = express();

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());

const db = require("./config/keys").mongoURI;

mongoose
  .connect(db, { userNewUrlParser: true })
  .then(() => console.log("Successfully connected to MongoDB."))
  .catch((err) => console.log(err));

app.use(passport.initialize());
require("./config/passport")(passport);

app.use("/api/users", users);
``;

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is up and runing on port ${port}!`));
