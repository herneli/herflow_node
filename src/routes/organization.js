import express from "express";
import db from "../models";

let router = express.Router();

/* GET home page. */
router.get("/", function(req, res, next) {
  db.Organization.findAll().then(organizations => {
    res.json(organizations);
  });
});

router.get("/:id", function(req, res, next) {
  db.Organization.findOne({
    where: { id: req.params.id }
  }).then(organization => {
    res.json(organization);
  });
});

export default router;
