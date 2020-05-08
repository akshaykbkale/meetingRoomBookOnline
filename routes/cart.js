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

     con.query(`select room_id,start_date,end_date from bookings where status="CART";`,function(err,result,feilds){
      
       res.render('cart',{result,data:{isadmin:admin}});
       console.log(admin);
       console.log(result);
    
  });
});



module.exports = router;
