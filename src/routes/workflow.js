import express from "express";
import db from "../models";

let router = express.Router();

/* GET home page. */
router.get("/", function(req, res, next) {
  db.Workflow.findAll({ include: db.Activity }).then(workflows => {
    res.json(workflows);
  });
});

router.get("/:id", function(req, res, next) {
  db.Workflow.findOne({
    where: { id: req.params.id },
    include: db.Activity
  }).then(workflow => {
    res.json(workflow.toApi());
  });
});

export default router;
