"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _models = require("../models");

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  _models2.default.User.findAll().then(function (users) {
    console.log(res);
    res.json(users);
  });
});

exports.default = router;
//# sourceMappingURL=api.js.map