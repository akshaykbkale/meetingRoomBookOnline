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

router.post('/searchResult',urlencoderParser,function(req,res,next){
    // const {floor,date,capacity}=req.body;
   // console.log(admin);
    var floor=req.body.floor;
    var capacity=req.body.capacity;
    
    console.log("Floor:"+floor+" and capacity:"+capacity);
    if(capacity=="Capacity"){
        con.query(`select room_id,room_name,capacity,floor,projector,conference_telephone,status from meeting_room  where floor="${floor}"`,function(err,result,feilds){
          res.render('searchResult',{result,data:{isadmin:admin}});
          console.log(result);
        });
    }
    else{
        con.query(`select room_id,room_name,capacity,floor,projector,conference_telephone,status from meeting_room where floor="${floor}" and capacity="${capacity}"`,function(err,result,feilds){
          res.render('searchResult',{result,data:{isadmin:admin}});
          console.log(result);
        });
    }
});

module.exports = router;