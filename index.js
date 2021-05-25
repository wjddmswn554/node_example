// var express = require('express');
// var app = express();

// //other setting
// app.set('view engine', 'ejs');
// app.use(express.static(__dirname+'/public')); //ejs에서 public 하위 js 호출

// // Routes  모든 req는 home을 res하도록 설정
// app.use('/', require('./routes/home'));

// //port setting
// var port = 3000;
// app.listen(port, function(){
//   console.log('server on! http://localhost:'+port);
// });

var express = require('express');
var app = express();
var http = require('http').Server(app); //1
var io = require('socket.io')(http);    //1  npm i socket --save 오류발생시-> npm link socket.io
var topics = require('./routes/topics');

app.set('view engine', 'ejs');
app.use(express.static(__dirname+'/public'));

//모든 req는 client.html을 response하도록 설정
app.use('/', require('./routes/home'));

//socket.io
io.on('connection', function(socket){ //사용자 접속하면 connection 이벤트자동발생
  console.log('client connected: ', socket.id);  //유저입장
  socket.on('disconnect', function(){ //접속해제시 disconnect 이벤트자동발생
    console.log('client disconnected: ', socket.id);
  });
  //사용자정의 이벤트 - client로부터 메세지 받음
  socket.on('send message', function(topic){ 
    console.log("메세지도착 : ", topic.A, topic.B, topic.C); 
    topics.create_process2(topic);
    io.emit('receive message', topic); //모든 클라이언트들에게 이벤트 전달
  });  
});

http.listen(3000, function(){ //app.listen이 아닌 http.listen
  console.log('####### server on! #######');
});