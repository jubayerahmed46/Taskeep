const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("hello, Im from database and ,task route,");
});

module.exports = router;
