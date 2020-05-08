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
    var searchText = req.body.search;
    var status = req.body.status;

    if(capacity=="Capacity"){
      capacity="10,12,15,20,30";
    }
    if(floor=="Select Floor"){
      floor="1,2,3,4";
    }
    if(searchText==""){
      searchText="%";
    }
    if(status=="Room availability"){
      status="a";
    }
    if(status=="Not Available"){
      status="n";
    }
    if(status=="Available"){
      status="va";
    }

    console.log("Floor:"+floor+" and capacity:"+capacity+" and searchText:"+searchText+" and status:"+status);
        con.query(`select room_id,image,room_name,capacity,floor,projector,conference_telephone,status from meeting_room  where floor in (${floor}) and capacity in (${capacity}) and room_name like '%${searchText}%' and status like '%${status}%'`,function(err,result,feilds){
          res.render('searchResult',{result,data:{isadmin:admin}});
          console.log(result);
        });
});

module.exports = router;