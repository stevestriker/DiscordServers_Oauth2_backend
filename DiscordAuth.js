require("dotenv").config();
const passport = require("passport");
const DiscordStrategy = require("passport-discord").Strategy;
const DiscordUser = require("./Models/DiscordUser");
const router = require("express").Router();

const scopes = ["identify", "guilds"];
// const DISCORD_CLIENT_ID = process.env.DISCORD_CLIENT_ID;
// const DISCORD_CLIENT_SECRET = process.env.DISCORD_CLIENT_SECRET;
// const DISCORD_CLIENT_REDIRECT = process.env.DISCORD_CLIENT_REDIRECT;

const DISCORD_CLIENT_ID = "905387916774211625";
const DISCORD_CLIENT_SECRET = "dz-IFf5MfUv4T8ttlLgT-JqverPDO4av";
const DISCORD_CLIENT_REDIRECT = "http://localhost:5000/auth/redirect";

passport.serializeUser(function (user, done) {
  done(null, user.id);
});
passport.deserializeUser(async (id, done) => {
  const user = await DiscordUser.findById(id);
  if (user) done(null, user);
});

passport.use(
  new DiscordStrategy(
    {
      clientID: DISCORD_CLIENT_ID,
      clientSecret: DISCORD_CLIENT_SECRET,
      callbackURL: DISCORD_CLIENT_REDIRECT,
      scope: scopes,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const user = await DiscordUser.findOne({ discordId: profile.id });
        if (user) {
          done(null, user);
        } else {
          const newUser = await DiscordUser.create({
            discordId: profile.id,
            username: profile.username,
            guilds: profile.guilds,
          });
          const savedUser = await newUser.save();
          done(null, savedUser);
        }
      } catch (err) {
        console.log(err);
        done(err, null);
      }

      console.log(profile.username);
      console.log(profile.id);
      console.log(profile.guilds.length);
    }
  )
);

//       User.findOrCreate({ discordId: profile.id }, function (err, user) {
//         console.log("before return of cb method");
//         return cb(err, user);
//         console.log("after return of cb method");
//       });
//     }
//   )
// );

//
// clientID: process.env.DISCORD_CLIENT_ID,
// clientSecret: process.env.DISCORD_CLIENT_SECRET,
// callbackURL: process.env.DISCORD_CLIENT_REDIRECT,
//