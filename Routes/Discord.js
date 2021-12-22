const router = require("express").Router();

// function isAuthorized(req, res, next) {
//   if (req.user) {
//     console.log("user logged in");
//     console.log("req.user");
//     next();
//   } else {
//     console.log("user not logged in");
//     res.redirect("/");
//   }
// }

router.get("/secretstuff", (req, res) => {
  res.send(500);
});
module.exports = router;
