import express from "express";

let router = express.Router();

/* GET home page. */
router.get("/", function(req, res, next) {
  // models.User.findAll().then(function(users) {
  //   console.log(res.locals);
  //   res.json(users);
  // });
});

export default router;
