var express = require('express');
var router = express.Router();
var topics = require('./topics');
var request =require('request'); //api test

router.use(express.urlencoded({ extend: true })); //post 연결

// Home
router.get('/', function (req, res) {
  topics.select_home(req, res); 
});
router.get('/about', function (req, res) {
  topics.select_process(req, res); // select 오늘 날짜 최신기준
  // res.render('home/about');
});
router.get('/pasing/:page', function (req, res, next) {
  topics.select_list2(req,res,next);
});
router.get('/pasing', function(req, res, next) { //list main 접속시 1로 자동
  res.redirect('/pasing/1');
});
router.get("/detail/:date", function (req, res) {
  topics.select_list_detail(req, res);
  });
router.post('/about_process', function (req, res, next) { //about.ejs <form> action
  topics.edit(req, res); //insert & update
});
router.get('/join', function (req, res, next) { //회원가입
  res.render('home/join');
});
router.post('/join_process', function (req, res, next) { //회원가입
  topics.join_process(req, res);
});
router.get('/join/new', function (req, res, next) { //로그인
  res.render('home/join_new');
});
router.post('/join/new_process', function (req, res, next) { //로그인 프로세스
  topics.new_process(req, res); //insert & update
});
router.get('/users', function (req, res, next) { //http api test
  // return res.json(users);
  request('https://172.30.1.22:1880/test',function(error, response, body){
  if(!error&&response.statusCode==200)
    console.log(body); 
    return res.json(body);
  });
});

// router.get('/chat', function (req, res) { //chatting example
//   // res.sendFile(__dirname + '/client.html');
//   res.render('home/client');
// });


let users = [
  {
      id : 1,
      name:'Hyun'
  }
]
module.exports = router;
