require("dotenv").config();
const { response } = require("express");
const express = require("express");
const passport = require("passport");
const session = require("express-session");
const auth = require("./DiscordAuth");
const app = express();
const router = require("express").Router();
const PORT = process.env.PORT || 3001;
const db = require("./database/database.js");

db.then(() => console.log("connected to Mongoose")).catch((err) =>
  console.log(err)
);

const discordPageRoute = require("./Routes/Discord");

app.use(
  session({
    secret: "secret words",
    cookie: {
      maxAge: 60000 * 60 * 24,
    },
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

//app.use("/discord", discordPageRoute);

app.get("/discord", (req, res) => {
  res.json({
    msg: `All Good`,
    time: Date(),
    status: "Stylin",
  });
});

app.get("/", passport.authenticate("discord"));
app.get(
  "/auth/redirect",
  passport.authenticate("discord", {
    failureRedirect: "/fail",
    successRedirect: "/discord",
  })
);

app.get("/test", (req, res) => {
  res.send("BING BANG FUCKIN BOOM");
});

app.get("/fail", (req, res) => {
  res.send("fail");
});

app.listen(PORT, () => {
  console.log(`I AM WATCHING YOU ON PORT ${PORT}`);
});

// app.get(
//   "/auth/discord/callback",
//   passport.authenticate("discord", {
//     failureRedirect: "/",
//   }),
//   function (req, res) {
//     res.send(200);
//   }
// );
//