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
  var message = "HERFLOW";
  res.render("index", { title: message });
});

exports.default = router;
//# sourceMappingURL=index.js.map