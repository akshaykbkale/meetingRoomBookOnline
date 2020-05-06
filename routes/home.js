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
    	/*for (var i = 0; i < result.length; i++) {
			rooms.push({name: 'Room Details' + result[i]});
		}
		
		totalRooms = 6;
		pageCount = 3;
			
		//split list into groups
		while (rooms.length > 0) {
			roomsArrays.push(rooms.splice(0, pageSize));
		}

		//set current page if specifed as get variable (eg: /?page=2)
		if (typeof req.query.page !== 'undefined') {
			currentPage = ++req.query.page;
		}

		//show list of students from group
		roomsList = roomsArrays[++currentPage-1];

			res.render('home', {
			rooms: rooms,
			pageSize: pageSize,
			totalRooms: totalRooms,
			pageCount: pageCount,
			currentPage: currentPage
		});
*/
      	res.render('home',{result});
    });
});



module.exports = router;
