import express from "express";
var router = express.Router();

/* GET home page. */
router.get("/", function(req, res, next) {
  let task = new TaskBase();
  task.validate();
  const message = "API";
  res.send("API!!!");
});

export default router;
