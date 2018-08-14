import express from "express";
import models from "../models";

let router = express.Router();

/* GET home page. */
router.get("/", function(req, res, next) {
  models.User.findAll().then(function(users) {
    res.json(users);
  });
});

export default router;
