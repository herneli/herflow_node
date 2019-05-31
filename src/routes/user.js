import express from "express";
import db from "../models";

let router = express.Router();

/* GET home page. */
router.get("/", function(req, res, next) {
  db.User.findAll().then(users => {
    res.json(users.map(user => user.toApi()));
  });
});

router.get("/current/settings", function(req, res, next) {
  if (req.user) {
    res.json(req.user.toApi());
  } else {
    res.sendStatus(404);
  }
});

router.post("/", function(req, res, next) {
  let user = db.User.build(req.body);
  user.password = user.hashPassword(user.password);
  user
    .save()
    .then(user => {
      res.json(user.toApi());
    })
    .catch(reason => {
      res.status(500).json({ error: reason });
    });
});

router.put("/:id", function(req, res, next) {
  let user = req.body;
  if (user.password) {
    user.password = db.User.hashPassword(user.password);
  }
  db.User.update(req.body, { where: { id: req.params.id } })
    .then(user => {
      res.json(user);
    })
    .catch(reason => {
      res.status(500).json({ error: "Error updating DB" });
    });
});

export default router;
