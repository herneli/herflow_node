import express from "express";
import db from "../models";

let router = express.Router();
const maxContacts = 10;
const Op = db.Sequelize.Op;

/* GET home page. */
router.get("/", function(req, res, next) {
  const organization = req.query.organization;
  const pattern = "%" + (req.query.pattern || "") + "%";
  if (!organization) {
    res.status(400).send("Organization required");
  }

  db.User.findAll({
    where: {
      email: { [Op.like]: pattern }
    },
    include: [
      {
        model: db.Organization,
        where: {
          id: organization
        },
        attributes: [],
        through: { attributes: [] }
      }
    ]
  }).then(users => {
    res.json(users);
  });
});

export default router;
