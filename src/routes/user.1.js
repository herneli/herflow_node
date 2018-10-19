import express from "express";
import bcrypt from "bcrypt";
import UserRepository from "../repos/UserRepository";
import _ from "lodash";

let router = express.Router();
router.get("/users", function(req, res, next) {
  let userRepository = new UserRepository(req.uow);
  userRepository
    .getAll()
    .then(users => {
      res.json(users.map(userRepository.toApi));
    })
    .catch(err => {
      next(err);
    });
});

router.get("/users/:id", function(req, res, next) {
  let userRepository = new UserRepository(req.uow);
  userRepository
    .getById(req.params.id)
    .then(user => {
      if (user) {
        res.json(userRepository.toApi(user));
      } else {
        res.sendStatus(404);
      }
    })
    .catch(err => {
      next(err);
    });
});

router.post("/users", function(req, res, next) {
  let userRepository = new UserRepository(req.uow);
  let user = userRepository.cleanApiUser(req.body);
  user.password = bcrypt.hashSync(user.password, 3);

  userRepository
    .insert(user)
    .then(user => {
      res.json(userRepository.toApi(user));
    })
    .catch(err => {
      next(err);
    });
});

router.put("/users/:id", function(req, res, next) {
  let userRepository = new UserRepository(req.uow);
  let user = userRepository.cleanApiUser(req.body);
  if (user.password) {
    user.password = bcrypt.hashSync(user.password, 3);
  }
  userRepository
    .update(req.params.id, user)
    .then(user => {
      if (user) {
        res.json(userRepository.toApi(user));
      } else {
        res.sendStatus(404);
      }
    })
    .catch(err => {
      next(err);
    });
});

export default router;
