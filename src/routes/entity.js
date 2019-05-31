import express from "express";
import db from "../models";

let router = express.Router();

/* GET home page. */
router.get("/", function(req, res, next) {
  db.Entity.findAll({ include: db.Form }).then(entities => {
    res.json(entities);
  });
});

router.get("/:id", function(req, res, next) {
  db.Entity.findOne({
    where: { id: req.params.id }
  }).then(entity => {
    res.json(entity);
  });
});

export default router;
