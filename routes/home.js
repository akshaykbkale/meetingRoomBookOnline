var express = require('express');
var router = express.Router();
var bodyParser =require('body-parser');
var mysql = require('mysql');

var totalRooms = 0, pageSize = 3, pageCount = 0, currentPage = 1, rooms = [], roomsArrays = [], roomsList = [];

var jsonPaser=bodyParser.json();
var urlencoderParser = bodyParser.urlencoded({ extended: false }) ;
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "final_project"
});

router.get('/home',urlencoderParser,function(req,res,next){
    con.query(`select * from meeting_room`,function(err,result,feilds){

console.log(admin);
      	res.render('home',{result,data:{isadmin:admin}});
    });
});



module.exports = router;
