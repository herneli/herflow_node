import express from "express";
import UnitOfWorkFactory from "../uow/UnitOfWorkFactory";

var router = express.Router();
/* GET home page. */
router.get("/", function(req, res, next) {
  const message = "HERFLOW";
  res.render("index", { title: message });
});

router.get("/test", function(req, res, next) {
  res.json(req.uow.getName());
});
export default router;
