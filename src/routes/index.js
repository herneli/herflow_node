import express from 'express'
import TaskBase from '../model/TaskBase'

var router = express.Router();
/* GET home page. */
router.get('/', function(req, res, next) {
  let task = new TaskBase();
  task.options = ""
  task.validate();
  res.render('index', { title: "HERFLOW" });
});

export default router;
