import express from 'express'
import TaskBase from '../model/TaskBase'

var router = express.Router();
/* GET home page. */
router.get('/', function(req, res, next) {
  let task = new TaskBase();
  task.validate();
  const message = "HERFLOW12";
  res.render('index', { title: message });
});

export default router;
