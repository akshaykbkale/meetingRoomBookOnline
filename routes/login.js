var express = require('express');
var router = express.Router();
var bodyParser =require('body-parser');
var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "final_project"
});

/* GET home page. */
router.get('/login', function(req, res, next) {
  res.render('login');
});


module.exports = router;
