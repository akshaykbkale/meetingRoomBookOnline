var express = require('express');
var router = express.Router();
var bodyParser =require('body-parser');
var mysql = require('mysql');
var crypto = require('crypto'),algorithm = 'aes-256-ctr', c_pwd= '$157wPl92Fin00al864ProJEcT577#';

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

  con.query(`select count(*) as count from users where username="${username}" and password="${crypted}"`,function (err,result,fields){
    if (err) { console.log(err.message)}
    console.log(fields);
    
    if(result[0].count==1){
      res.send("true");
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
  res.render('profile');
});


router.get('/about', function(req, res, next) {
  res.render('about');
});


router.get('/contact', function(req, res, next) {
  res.render('contact');
});

module.exports = router;
