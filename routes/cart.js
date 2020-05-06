var express = require('express');
var router = express.Router();
var bodyParser =require('body-parser');
var mysql = require('mysql');

var jsonPaser=bodyParser.json();
var urlencoderParser = bodyParser.urlencoded({ extended: false }) ;
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "final_project"
});

router.get('/cart',urlencoderParser,function(req,res,next){
    // const {floor,date,capacity}=req.body;
    // const floor=req.body.floor;
    // console.log(floor);
    con.query(`select room_id,room_name,capacity,floor,projector,conference_telephone from meeting_room`,function(err,result,feilds){
      res.render('cart',{result});
      //console.log(result);
    });
});



module.exports = router;
