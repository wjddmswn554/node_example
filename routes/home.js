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
  request('http://172.30.1.50:1880/test',function(error, response, body){
  if(!error&&response.statusCode==200)
    console.log(body); 
    return res.json(body);
  });
});

router.post('/test', function (req, res, next) { //http api test post
  var body = req.body; //payload
  var byte_str = req.body.data.payload
  
  //change byte_to_hex funtion
  function bytesToHexString(bytes){
    if (!bytes){
      return null;
    }
  
    bytes = new Uint8Array(bytes);
    var hexBytes = [];
  
    for (var i = 0; i < bytes.length; ++i) {
      var byteString = bytes[i].toString(16);
      if (byteString.length < 2){
        byteString = "0" + byteString;
      }
      hexBytes.push(byteString);
    }
    return hexBytes.join("");
  }


  //change byte_to_hex
  var result = "";
  const hexStr = bytesToHexString(byte_str);
  console.log('==============================================================');
  console.log('Receive data : ', body);
  console.log('==============================================================');
  console.log('Receive eui : ', body.data.eui);
  console.log('Receive hex : ', hexStr);

  //스피커
  var magnetic = hexStr.substr(2,2);
  var ir = hexStr.substr(4,2);
  var acceleration = hexStr.substr(6,2);
  var mask = parseInt(hexStr.substr(0,2), 16).toString(2);

  //서브넷 마스크 on/off
  var magnetic_use = 'off';
  var ir_use = 'off';
  var acceleration_use = 'off';
  var gas_use = 'off';
  var temp_humi_use = 'off';
  if(mask.substr(0,1) == 1){
    magnetic_use = 'on';
  }
  if(mask.substr(1,1) == 1){
    ir_use = 'on';
  }
  if(mask.substr(2,1) == 1){
    acceleration_use = 'on';
  }
  if(mask.substr(3,1) == 1){
    gas_use = 'on';
  }
  if(mask.substr(4,1) == 1){
    temp_humi_use = 'on';
  }
  //가스
  var CH4 = parseInt(hexStr.substr(20,4),16); //메탄
  var O2 = parseInt(hexStr.substr(16,4),16)/10;  //산소
  var H2S = parseInt(hexStr.substr(12,4),16);  //황화수소
  var CO = parseInt(hexStr.substr(8,4),16);  //일산화탄소

  //온도 습도
  var humi = hexStr.substr(28,4);
  var temp = hexStr.substr(24,4);
  humi = (parseFloat(parseInt(humi, 16))/16382.0)*100.0; 
  temp = (parseFloat(parseInt(temp, 16))/16382.0)*165.0-40.0; 

  // x, y, z 축
  var x_data = hexStr.substr(32,4);
  var y_data = hexStr.substr(36,4);
  var z_data = hexStr.substr(40,4);
  x_data = parseInt(x_data, 16)/364; 
  y_data = parseInt(y_data, 16)/364; 
  z_data = parseInt(z_data, 16)/364; 

  console.log('서브넷마스크 : 마그네틱',magnetic_use,'/근접',ir_use,'/가속도',acceleration_use,'/유해가스',gas_use,'/온습도',temp_humi_use);
  console.log('마그네틱 : ', magnetic, ', 근접 : ', ir, ', 가속도 : ', acceleration);
  console.log('CO : ', CO, ', H2S : ', H2S, ', O2 : ', O2, ', CH4 : ', CH4);
  console.log('온도 : ', temp, ', 습도 : ', humi);
  console.log('x축 : ',x_data,'도, \ny축 : ', y_data, '도,\nz축 : ', z_data,'도');
  console.log('==============================================================');

  let users = {state:'success'}
  return res.json(users);
});
// router.get('/test2', function (req, res, next) { //http api test
//   process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
//   // return res.json(users);
//   request('http://172.30.1.50:1880/test',function(error, response, body){
//   if(!error&&response.statusCode==200)
//     console.log(body); 
//     return res.json(body);
//   });
// });


// router.get('/chat', function (req, res) { //chatting example
//   // res.sendFile(__dirname + '/client.html');
//   res.render('home/client');
// });



module.exports = router;
