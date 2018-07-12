'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _TaskBase = require('../model/TaskBase');

var _TaskBase2 = _interopRequireDefault(_TaskBase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();
/* GET home page. */
router.get('/', function (req, res, next) {
  var task = new _TaskBase2.default();
  task.validate();
  var message = "HERFLOW12";
  res.render('index', { title: message });
});

exports.default = router;
//# sourceMappingURL=index.js.map