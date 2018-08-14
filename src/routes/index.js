import express from "express";
import db from "../models";

var router = express.Router();
/* GET home page. */
router.get("/", function(req, res, next) {
  const message = "HERFLOW";
  res.render("index", { title: message });
});

export default router;
