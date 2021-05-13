const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

const users = require("./routes/api/users");
const todo = require("./routes/api/todo");
const event = require("./routes/api/event");

const app = express();

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());

const db = require("./config/keys").mongoURI;

mongoose
  .connect(process.env.mongoURI || db, { userNewUrlParser: true })
  .then(() => console.log("Successfully connected to MongoDB."))
  .catch((err) => console.log(err));

app.use(passport.initialize());
require("./config/passport")(passport);

app.use("/api/users", users);
app.use("/api/todo", todo);
app.use("/api/event", event);

if(process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client', 'build', 'index.html'))
  });

}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is up and runing on port ${port}!`));
