var express = require('express');
var router = express.Router();
var bodyParser =require('body-parser');
var session= require('express-session');
var mysql = require('mysql');
var crypto = require('crypto'),algorithm = 'aes-256-ctr', c_pwd= '$157wPl92Fin00al864ProJEcT577#';
var uid;

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "final_project"
});


var jsonPaser=bodyParser.json();
var urlencoderParser = bodyParser.urlencoded({ extended: false }) ;

//decryption -- unused for now -- do not remove
function decrypt(text){
  var decipher = crypto.createDecipher(algorithm,c_pwd)
  var dec = decipher.update(text,'hex','utf8')
  dec += decipher.final('utf8');
  return dec;
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express1' });
});


router.post('/ajaxcall',jsonPaser, function(req, res, next) {
  const {username,password}=req.body;
  console.log(username);
  console.log(password);
  
  var cipher = crypto.createCipher(algorithm,c_pwd)
  var crypted = cipher.update(password,'utf8','hex')
  crypted += cipher.final('hex');

  con.query(`select user_type from users where username="${username}"`, function (err,result) {
    if (err) { console.log(err.message)}
    ; 
    admin=result[0].user_type;  
    console.log("u type here:"+admin);
  });

  con.query(`select count(*) as count from users where username="${username}" and password="${crypted}"`,function (err,result,fields){
    if (err) { console.log(err.message)}
    console.log(fields);
    
    if(result[0].count==1){
      ss=req.body.username;
      res.send("true");
      console.log(ss);
    }
    else{
      res.send("false");
    }
    
  });
  
});

router.post('/validate',jsonPaser, function(req, res, next) {
  const {username,email}=req.body;
  console.log("val_name:"+username);
  console.log("val_email:"+email);

  con.query(`select count(*) as count from users where username="${username}"`,function (err,result,fields){
    if (err) { console.log(err.message)}
    console.log(fields);
    
    if(result[0].count==0){
      con.query(`select count(*) as count from users where email="${email}"`,function (err1,result1,fields1){
          if (err1) { console.log(err.message)}
          console.log(fields1);

          if(result1[0].count==0){
            res.send("true");
          }
          else{
            res.send("e_false");
          }
      });
    }
    else{
      res.send("u_false");
    }  
});
  
});

router.post('/entry',jsonPaser, function(req, res, next) {

const {username,firstname,lastname,password,email,company}=req.body;
console.log(username);

var cipher = crypto.createCipher(algorithm,c_pwd)
var crypted = cipher.update(password,'utf8','hex')
crypted += cipher.final('hex');

      con.query(`insert into users (username,firstname,lastname,password,email,company) values ("${username}","${firstname}","${lastname}","${crypted}","${email}","${company}");`, function (err) {
      if (err) { console.log(err.message)}
      ; 
      res.send("successful");     
    });  
});

router.get('/profile', function(req, res, next) {
  console.log(ss);
  res.render('profile');

});


router.get('/about', function(req, res, next) {
  res.render('about');
});


router.get('/contact', function(req, res, next) {
  res.render('contact');
});

router.post('/addCart', function(req, res, next) {
  var room_id = req.body.room_id;
  console.log(room_id);

  con.query(`insert into bookings (username,room_id,status) values ("${ss}","${room_id}","CART");`, function (err) {
    if (err) { console.log(err.message)}
    ; 
    res.send("added");     
  });  
  
});

router.post('/book/:id',jsonPaser,function(req, res, next) {
  const param_id=req.params.id;
  const start_date = req.body.start_date;
  const end_date = req.body.end_date;
  const capacity = req.body.capacity;

  console.log(param_id);
  console.log(start_date);
  var res1 = start_date.split(" ");
  console.log(res1[2]);
  var start;
  var end;
  if(res1[2]=="AM"){
     start =res1[0].concat(' ', res1[1] + ":00");
  }
  else{
     start =res1[0].concat(' ', res1[1] + ":00");
  }
  var res2 = end_date.split(" ");
  console.log(res2[2]);
  var end;
  if(res1[2]=="AM"){
     end =res2[0].concat(' ', res2[1] + ":00");
  }
  else{
     end =res2[0].concat(' ', res2[1] + ":00");
  }

  start=start.replace("/", "-");
  end = end.replace("/", "-");
  start=start.replace("/", "-");
  end = end.replace("/", "-");

  console.log(start_date);
  console.log('hee');
  con.query(`update bookings set start_date="${start}" , end_date="${end}", status="Booked",capacity="${capacity}" where room_id="${param_id}" and status="CART"`, function (err,result,fields) {
    if (err) { console.log(err.message)};
  console.log(result);
    
    res.redirect("/home");    
  });  
  
  
  
});

router.get('/booking',function(req,res,next){

  con.query(`select room_id,start_date,end_date,capacity from bookings where username="${ss}" and status="Booked";`,function(err,result,feilds){

    res.render('bookings',{result});

    console.log(result);
 });
});

router.get('/edit/:id',jsonPaser, function(req, res) {
  var rid = req.params.id;
  console.log(rid);
con.query(`select * from meeting_room where room_id="${rid}"`,function (err,result,fields){
    if (err) { console.log(err.message)}
    ;
    console.log('room data:'+result[0].room_name); 
    res.render('edit',{result});     
  }); 
});

// deleting the room by using id
router.post('/deleteRoom/:id',jsonPaser, function(req, res) {
  var rid = req.params.id;
  console.log("deleting room");
con.query(`update meeting_room  set status="n/a" where room_id="${rid}"`,function (err,result,fields){
    if (err) { console.log(err.message)}
    ;
    res.redirect('/home');    
  }); 
});

//updating the id
router.post('/updateRoom/:id',jsonPaser, function(req, res) {
  var rid = req.params.id;
  console.log("Editing room");
  const {room_name,capacity,floor,projector,phone}=req.body;
  console.log(rid);
con.query(`update meeting_room  set room_name="${room_name}",capacity="${capacity}",floor="${floor}",projector="${projector}",conference_telephone="${phone}"  where room_id="${rid}"`,function (err,result,fields){
    if (err) { console.log(err.message)}
    ;
    res.redirect('/home');    
  }); 
});
// rendering the addroom page
router.get('/addRoom',jsonPaser, function(req, res) {
    res.render('addRoom')
});

// adding room by admin - post method
router.post('/addRoom',jsonPaser, function(req, res) {
  
  console.log("Adding new room");
  const {room_id,room_name,capacity,floor,projector,phone}=req.body;
  console.log(room_id);
  console.log(room_name);
con.query(`insert into meeting_room (room_id,room_name,capacity,floor,projector,conference_telephone) values ("${room_id}","${room_name}","${capacity}","${floor}","${projector}","${phone}")`,function (err,result,fields){
    if (err) { console.log(err.message)}
    ;
    res.redirect('/home');    
  }); 
});


// cancelling the booking by the user
router.post('/cancelBooking', function(req, res, next) {
  var room_id = req.body.room_id;
  console.log(room_id);
  con.query(`update bookings set status="Cancelled" where room_id="${room_id}"`, function (err,result) {
    if (err) { console.log(err.message)}
    ; 
    res.send("cancelled");
  });  
  
});

module.exports = router;
