const router = require("express").Router();

router.get("/test", (req, res) => {
  res.send("TEST TEST TEST");
});
module.exports = router;
