const e = require('express');
var db = require('./db');
const crypto = require('crypto')//암호화
const encrypt = require('./crypto');

//오늘날짜
var now = new Date();
var year = now.getFullYear(); //연도
var month = now.getMonth() + 1;	// 월
if (String(month).length === 1) month = '0' + month;
var date = now.getDate();	// 일
if (String(date).length === 1) date = '0' + date;
var Dday = year + '-' + month + '-' + date;

exports.create_process = function (req, res) { //<form> action
  // console.log(req.body.table);
  var table = new Array(3);
  for (var i = 0; i < table.length; i++) {
    table[i] = new Array(6) //모델5, 목표5, 생산5, 합계2, 달성률1, 비고1
    for (var y = 0; y < 3; y++) {
      table[i][y] = new Array(5); // 모델, 목표, 생산
    }
    table[i][3] = new Array(2);
    for (var y = 0; y < 3; y++) {
      for (var j = 0; j < table[i][0].length; j++) {
        table[i][y][j] = req.body.table[i][y][j];//모델, 목표, 생산
      }
    }
    for (var k = 0; k < table[i][3].length; k++) {
      table[i][3][k] = req.body.table[i][3][k]; //합계
    }
    table[i][4] = req.body.table[i][4]; //달성률
    table[i][5] = req.body.table[i][5]; //비고
    table[i][6] = req.body.table[i][6]; //모델명
  }
  var line = ['A', 'B', 'C'];

  db.query(`select * from smt where date like '${Dday}%' ORDER BY date DESC LIMIT 3;`, function (error, topics) {
    if (error) throw error;
   
    if (topics == "" || topics == null || topics == undefined || (topics != null && typeof topics == "object" && !Object.keys(topics).length)) { 
      db.query(`
        insert into smt 
        (line, amodel, atarget, aproduction, bmodel, btarget, bproduction, cmodel, ctarget, cproduction, dmodel, dtarget, dproduction, emodel, etarget, eproduction, targettotal, resulttotal, achivementrate, remarks, modelname) 
        value (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
        `,
        [line[0], table[0][0][0], table[0][1][0], table[0][2][0], table[0][0][1], table[0][1][1], table[0][2][1], table[0][0][2], table[0][1][2], table[0][2][2], table[0][0][3], table[0][1][3], table[0][2][3], table[0][0][4], table[0][1][4], table[0][2][4], table[0][3][0], table[0][3][1], table[0][4], table[0][5], table[0][6]],
        function (error, result) {
          if (error) throw error;
        })
      db.query(`
        insert into smt 
        (line, amodel, atarget, aproduction, bmodel, btarget, bproduction, cmodel, ctarget, cproduction, dmodel, dtarget, dproduction, emodel, etarget, eproduction, targettotal, resulttotal, achivementrate, remarks, modelname) 
        value (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
        `,
        [line[1], table[1][0][0], table[1][1][0], table[1][2][0], table[1][0][1], table[1][1][1], table[1][2][1], table[1][0][2], table[1][1][2], table[1][2][2], table[1][0][3], table[1][1][3], table[1][2][3], table[1][0][4], table[1][1][4], table[1][2][4], table[1][3][0], table[1][3][1], table[1][4], table[1][5], table[1][6]],
        function (error, result) {
          if (error) throw error;
        })
      db.query(`
        insert into smt 
        (line, amodel, atarget, aproduction, bmodel, btarget, bproduction, cmodel, ctarget, cproduction, dmodel, dtarget, dproduction, emodel, etarget, eproduction, targettotal, resulttotal, achivementrate, remarks, modelname) 
        value (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
        `,
        [line[2], table[2][0][0], table[2][1][0], table[2][2][0], table[2][0][1], table[2][1][1], table[2][2][1], table[2][0][2], table[2][1][2], table[2][2][2], table[2][0][3], table[2][1][3], table[2][2][3], table[2][0][4], table[2][1][4], table[2][2][4], table[2][3][0], table[2][3][1], table[2][4], table[2][5], table[2][6]],
        function (error, result) {
          if (error) throw error;
          res.writeHead(302, { Location: `/about` });
          res.end();
        })
    } else { // 당일 처음 이후 저장할 때
      db.query(`
        UPDATE smt
        SET line=?, amodel=?, atarget=?, aproduction=?, bmodel=?, btarget=?, bproduction=?, cmodel=?, ctarget=?, cproduction=?, dmodel=?, dtarget=?, dproduction=?, emodel=?, etarget=?, eproduction=?, targettotal=?, resulttotal=?, achivementrate=?, remarks=?, modelname=?
        WHERE date like '${Dday}%' and line like 'A' order by date DESC LIMIT 1;
        `,
        [line[0], table[0][0][0], table[0][1][0], table[0][2][0], table[0][0][1], table[0][1][1], table[0][2][1], table[0][0][2], table[0][1][2], table[0][2][2], table[0][0][3], table[0][1][3], table[0][2][3], table[0][0][4], table[0][1][4], table[0][2][4], table[0][3][0], table[0][3][1], table[0][4], table[0][5], table[0][6]],
        function (error, result) {
          if (error) throw error;
        })
      db.query(`
        UPDATE smt
        SET line=?, amodel=?, atarget=?, aproduction=?, bmodel=?, btarget=?, bproduction=?, cmodel=?, ctarget=?, cproduction=?, dmodel=?, dtarget=?, dproduction=?, emodel=?, etarget=?, eproduction=?, targettotal=?, resulttotal=?, achivementrate=?, remarks=? , modelname=?
        WHERE date like '${Dday}%' and line like 'B' order by date DESC LIMIT 1;
        `,
        [line[1], table[1][0][0], table[1][1][0], table[1][2][0], table[1][0][1], table[1][1][1], table[1][2][1], table[1][0][2], table[1][1][2], table[1][2][2], table[1][0][3], table[1][1][3], table[1][2][3], table[1][0][4], table[1][1][4], table[1][2][4], table[1][3][0], table[1][3][1], table[1][4], table[1][5], table[1][6]],
        function (error, result) {
          if (error) throw error;
        })
      db.query(`
        UPDATE smt
        SET line=?, amodel=?, atarget=?, aproduction=?, bmodel=?, btarget=?, bproduction=?, cmodel=?, ctarget=?, cproduction=?, dmodel=?, dtarget=?, dproduction=?, emodel=?, etarget=?, eproduction=?, targettotal=?, resulttotal=?, achivementrate=?, remarks=?, modelname=?
        WHERE date like '${Dday}%' and line like 'C' order by date DESC LIMIT 1;
        `,
        [line[2], table[2][0][0], table[2][1][0], table[2][2][0], table[2][0][1], table[2][1][1], table[2][2][1], table[2][0][2], table[2][1][2], table[2][2][2], table[2][0][3], table[2][1][3], table[2][2][3], table[2][0][4], table[2][1][4], table[2][2][4], table[2][3][0], table[2][3][1], table[2][4], table[2][5], table[2][6]],
        function (error, result) {
          if (error) throw error;
          res.writeHead(302, { Location: `/about` });
          res.end();
        })
    }
  })
  
}

exports.select_process = function (req, res) {
  db.query(`select * from smt where date like '${Dday}%' ORDER BY date DESC LIMIT 3;`, function (error, topics) {
    if (error) throw error;
   
    if (topics == "" || topics == null || topics == undefined || (topics != null && typeof topics == "object" && !Object.keys(topics).length)) {
      res.render('home/about', { topic: topics, sw:1}); //아직 오늘 입력 안했을 때
      } else {
      res.render('home/about', { topic: topics, sw:0}); 
    }

  });
}

exports.select_home = function (req, res) {
  db.query(`select * from smt where date like '${Dday}%' ORDER BY date DESC LIMIT 3;`, function (error, topics) {
    if (error) throw error;
    if (topics == "" || topics == null || topics == undefined || (topics != null && typeof topics == "object" && !Object.keys(topics).length)) {
      res.render('home/main', { sw: 1 });
    } else {
      res.render('home/main', { topic: topics, sw: 0 });
    }
  });
}

exports.create_process2 = function (req) {
  var table = new Array(3);
  for (var i = 0; i < table.length; i++) {
    table[i] = new Array(6) //모델5, 목표5, 생산5, 합계2, 달성률1, 비고1
    for (var y = 0; y < 3; y++) {
      table[i][y] = new Array(5); // 모델, 목표, 생산
    }
    table[i][3] = new Array(2);
  }
    for (var y = 0; y < 3; y++) {
      for (var j = 0; j < table[0][0].length; j++) {//모델, 목표, 생산 req.A[0][0] = amodel
        table[0][y][j] = req.A[y][j];
        table[1][y][j] = req.B[y][j];
        table[2][y][j] = req.C[y][j];
      }
    }
    for (var k = 0; k < table[0][3].length; k++) {//합계
      table[0][3][k] = req.A[3][k]; 
      table[1][3][k] = req.B[3][k]; 
      table[2][3][k] = req.C[3][k]; 
    }
    table[0][4] = req.A[4]; //달성률
    table[1][4] = req.B[4]; 
    table[2][4] = req.C[4]; 
    table[0][5] = req.A[5]; //비고
    table[1][5] = req.B[5];
    table[2][5] = req.C[5];
    table[0][6] = req.A[6]; //모델명
    table[1][6] = req.B[6];
    table[2][6] = req.C[6];
  
  var line = ['A', 'B', 'C'];

  db.query(`select * from smt where date like '${Dday}%' ORDER BY date DESC LIMIT 3;`, function (error, topics) {
    if (error) throw error;
   
    if (topics == "" || topics == null || topics == undefined || (topics != null && typeof topics == "object" && !Object.keys(topics).length)) { // 당일 처음 저장할 때
      db.query(`
        insert into smt 
        (line, amodel, atarget, aproduction, bmodel, btarget, bproduction, cmodel, ctarget, cproduction, dmodel, dtarget, dproduction, emodel, etarget, eproduction, targettotal, resulttotal, achivementrate, remarks, modelname) 
        value (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
        `,
        [line[0], table[0][0][0], table[0][1][0], table[0][2][0], table[0][0][1], table[0][1][1], table[0][2][1], table[0][0][2], table[0][1][2], table[0][2][2], table[0][0][3], table[0][1][3], table[0][2][3], table[0][0][4], table[0][1][4], table[0][2][4], table[0][3][0], table[0][3][1], table[0][4], table[0][5], table[0][6]],
        function (error, result) {
          if (error) throw error;
        })
      db.query(`
        insert into smt 
        (line, amodel, atarget, aproduction, bmodel, btarget, bproduction, cmodel, ctarget, cproduction, dmodel, dtarget, dproduction, emodel, etarget, eproduction, targettotal, resulttotal, achivementrate, remarks, modelname) 
        value (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
        `,
        [line[1], table[1][0][0], table[1][1][0], table[1][2][0], table[1][0][1], table[1][1][1], table[1][2][1], table[1][0][2], table[1][1][2], table[1][2][2], table[1][0][3], table[1][1][3], table[1][2][3], table[1][0][4], table[1][1][4], table[1][2][4], table[1][3][0], table[1][3][1], table[1][4], table[1][5], table[1][6]],
        function (error, result) {
          if (error) throw error;
        })
      db.query(`
        insert into smt 
        (line, amodel, atarget, aproduction, bmodel, btarget, bproduction, cmodel, ctarget, cproduction, dmodel, dtarget, dproduction, emodel, etarget, eproduction, targettotal, resulttotal, achivementrate, remarks, modelname) 
        value (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
        `,
        [line[2], table[2][0][0], table[2][1][0], table[2][2][0], table[2][0][1], table[2][1][1], table[2][2][1], table[2][0][2], table[2][1][2], table[2][2][2], table[2][0][3], table[2][1][3], table[2][2][3], table[2][0][4], table[2][1][4], table[2][2][4], table[2][3][0], table[2][3][1], table[2][4], table[2][5], table[2][6]],
        function (error, result) {
          if (error) throw error;
        })
    } else { // 당일 처음 이후 저장할 때
      db.query(`
        UPDATE smt
        SET line=?, amodel=?, atarget=?, aproduction=?, bmodel=?, btarget=?, bproduction=?, cmodel=?, ctarget=?, cproduction=?, dmodel=?, dtarget=?, dproduction=?, emodel=?, etarget=?, eproduction=?, targettotal=?, resulttotal=?, achivementrate=?, remarks=?, modelname=?
        WHERE date like '${Dday}%' and line like 'A' order by date DESC LIMIT 1;
        `,
        [line[0], table[0][0][0], table[0][1][0], table[0][2][0], table[0][0][1], table[0][1][1], table[0][2][1], table[0][0][2], table[0][1][2], table[0][2][2], table[0][0][3], table[0][1][3], table[0][2][3], table[0][0][4], table[0][1][4], table[0][2][4], table[0][3][0], table[0][3][1], table[0][4], table[0][5], table[0][6]],
        function (error, result) {
          if (error) throw error;
        })
      db.query(`
        UPDATE smt
        SET line=?, amodel=?, atarget=?, aproduction=?, bmodel=?, btarget=?, bproduction=?, cmodel=?, ctarget=?, cproduction=?, dmodel=?, dtarget=?, dproduction=?, emodel=?, etarget=?, eproduction=?, targettotal=?, resulttotal=?, achivementrate=?, remarks=? , modelname=?
        WHERE date like '${Dday}%' and line like 'B' order by date DESC LIMIT 1;
        `,
        [line[1], table[1][0][0], table[1][1][0], table[1][2][0], table[1][0][1], table[1][1][1], table[1][2][1], table[1][0][2], table[1][1][2], table[1][2][2], table[1][0][3], table[1][1][3], table[1][2][3], table[1][0][4], table[1][1][4], table[1][2][4], table[1][3][0], table[1][3][1], table[1][4], table[1][5], table[1][6]],
        function (error, result) {
          if (error) throw error;
        })
      db.query(`
        UPDATE smt
        SET line=?, amodel=?, atarget=?, aproduction=?, bmodel=?, btarget=?, bproduction=?, cmodel=?, ctarget=?, cproduction=?, dmodel=?, dtarget=?, dproduction=?, emodel=?, etarget=?, eproduction=?, targettotal=?, resulttotal=?, achivementrate=?, remarks=?, modelname=?
        WHERE date like '${Dday}%' and line like 'C' order by date DESC LIMIT 1;
        `,
        [line[2], table[2][0][0], table[2][1][0], table[2][2][0], table[2][0][1], table[2][1][1], table[2][2][1], table[2][0][2], table[2][1][2], table[2][2][2], table[2][0][3], table[2][1][3], table[2][2][3], table[2][0][4], table[2][1][4], table[2][2][4], table[2][3][0], table[2][3][1], table[2][4], table[2][5], table[2][6]],
        function (error, result) {
          if (error) throw error;
        })
    }
  })
  
}

exports.select_list2 = function(req, res) { // https://abc1211.tistory.com/533

  var page_size = 10; //페이지당 게시물 수
  var page_list_size = 10; // 페이지의 개수 1~10
  var no = ""; // limit 변수
  var totalPageCount = 0; //전체 게시물의 숫자

  var queryString = `select count(*) as cnt from smt where line like "A"`;
  db.query(queryString, function(error, data) {
    if(error){
      console.log(error + "list mysql 조회 실패");
      return
    }
    //전체 게시물의 숫자
    totalPageCount = data[0].cnt;
    //현재 페이지
    var curPage = req.params.page;
    console.log("현재페이지 : "+curPage, "전체페이지 : "+totalPageCount);

    //전체페이지 갯수
    if(totalPageCount < 0) {
      totalPageCount = 0;
    }

    var totalPage = Math.ceil(totalPageCount / page_size) //전체 페이지 수
    var totalSet = Math.ceil(totalPage / page_list_size); //전체 세트 수
    var curSet = Math.ceil(curPage / page_list_size); // 현재 셋트 번호
    var startPage = ((curSet - 1) * 10) + 1 //현재 세트 내 출력될 시작 페이지
    var endPage = (startPage + page_list_size); // 현재 세트 내 출력될 마지막 페이지

    //현재 페이지가 0보다 작을 경우
    if(curPage < 0) {
      no = 0;
    } else {
      // 0보다 크면 limit 함수에 들어갈 첫번째 인자 값 구하기
      no = (curPage - 1) * 10;
    }

    console.log('[0] curPage : ' + curPage + ' | [1] page_list_size : ' + page_list_size + ' | [2] page_size : ' + page_size + ' | [3] totalPage : ' + totalPage + ' | [4] totalSet : ' + totalSet + ' | [5] curSet : ' + curSet + ' | [6] startPage : ' + startPage + ' | [7] endPage : ' + endPage)

    var result2 = {
      "curPage": curPage,
      "page_list_size": page_list_size,
      "page_size": page_size,
      "totalPage": totalPage,
      "totalSet": totalSet,
      "curSet": curSet,
      "startPage": startPage,
      "endPage": endPage
      };
      
    var queryString = `select * from smt where line like 'A' and date not like '${Dday}%' order by date desc limit ?,?`;
    db.query(queryString, [no, page_size], function(error2, result){
      if(error2) {
        console.log("페이징 sql 에러"+ error);
        return
      }
      res.render('home/pasing', {data: result, pasing: result2});
    })
  })

}

exports.select_list_detail = function(req, res) { // https://abc1211.tistory.com/533
  db.query('select * from smt where date like ?', [req.params.date], function(error, result){
    res.render('home/detail', {topic : result});
  })
}

exports.edit = function (req, res) { // https://abc1211.tistory.com/533
  console.log("수정 포스트 진행")
  var date = req.body.date;
  console.log(date);
  var queryString = `select * from smt where date like '${date}%' order by date desc limit 3`;
  db.query(queryString, function (error, table) {
    if (error) {
      console.log("### edit sql 에러 : " + error);
      return
    }
    var line = ['A', 'B', 'C'];
    // db.query(`
    // UPDATE smt
    // SET modelname = 'Amodelname2'
    // WHERE date like '${date}%' and line like ? order by date DESC LIMIT 1;
    // `,['A']
    // , function(error2, result){
    //   console.log('쿼리 결과 : ', result);
    // })
    db.query(`
      UPDATE smt
      SET line=?, amodel=?, atarget=?, aproduction=?, bmodel=?, btarget=?, bproduction=?, cmodel=?, ctarget=?, cproduction=?, dmodel=?, dtarget=?, dproduction=?, emodel=?, etarget=?, eproduction=?, targettotal=?, resulttotal=?, achivementrate=?, remarks=?, modelname=?
      WHERE date like '${date}%' and line like 'A';
      `,
      [line[0], req.body.table[0][0][0], req.body.table[0][1][0], req.body.table[0][2][0], req.body.table[0][0][1], req.body.table[0][1][1], req.body.table[0][2][1], req.body.table[0][0][2], req.body.table[0][1][2], req.body.table[0][2][2], req.body.table[0][0][3], req.body.table[0][1][3], req.body.table[0][2][3], req.body.table[0][0][4], req.body.table[0][1][4], req.body.table[0][2][4], req.body.table[0][3][0], req.body.table[0][3][1], req.body.table[0][4], req.body.table[0][5], req.body.table[0][6]],
      function (error2, result2) {
        if (error2) throw error2;
    })
    db.query(`
      UPDATE smt
      SET line=?, amodel=?, atarget=?, aproduction=?, bmodel=?, btarget=?, bproduction=?, cmodel=?, ctarget=?, cproduction=?, dmodel=?, dtarget=?, dproduction=?, emodel=?, etarget=?, eproduction=?, targettotal=?, resulttotal=?, achivementrate=?, remarks=?, modelname=?
      WHERE date like '${date}%' and line like 'B';
      `,
      [line[1], req.body.table[1][0][0], req.body.table[1][1][0], req.body.table[1][2][0], req.body.table[1][0][1], req.body.table[1][1][1], req.body.table[1][2][1], req.body.table[1][0][2], req.body.table[1][1][2], req.body.table[1][2][2], req.body.table[1][0][3], req.body.table[1][1][3], req.body.table[1][2][3], req.body.table[1][0][4], req.body.table[1][1][4], req.body.table[1][2][4], req.body.table[1][3][0], req.body.table[1][3][1], req.body.table[1][4], req.body.table[1][5], req.body.table[1][6]],
      function (error3, result3) {
        if (error3) throw error3;
    })
    db.query(`
      UPDATE smt
      SET line=?, amodel=?, atarget=?, aproduction=?, bmodel=?, btarget=?, bproduction=?, cmodel=?, ctarget=?, cproduction=?, dmodel=?, dtarget=?, dproduction=?, emodel=?, etarget=?, eproduction=?, targettotal=?, resulttotal=?, achivementrate=?, remarks=?, modelname=?
      WHERE date like '${date}%' and line like 'C';
      `,
      [line[2], req.body.table[2][0][0], req.body.table[2][1][0], req.body.table[2][2][0], req.body.table[2][0][1], req.body.table[2][1][1], req.body.table[2][2][1], req.body.table[2][0][2], req.body.table[2][1][2], req.body.table[2][2][2], req.body.table[2][0][3], req.body.table[2][1][3], req.body.table[2][2][3], req.body.table[2][0][4], req.body.table[2][1][4], req.body.table[2][2][4], req.body.table[2][3][0], req.body.table[2][3][1], req.body.table[2][4], req.body.table[2][5], req.body.table[2][6]],
      function (error4, result4) {
        if (error4) throw error4;
        // res.redirect(`/detail/${table[0].date}`);
        res.writeHead(302, { Location: `/detail/${table[0].date}` });
        res.end();
    })
  })
      

}

// 회원가입 process
exports.join_process = function (req, res) { //https://zinirun.github.io/2020/12/02/node-crypto-password/
  var body = req.body;
  var username = body.username;
  var name = body.name;
  var email = body.email;
  var password = body.password;

  const createSalt = () => //salt를 반환하는 함수
    new Promise((resolve, reject) => { //promise
        crypto.randomBytes(64, (err, buf) => { //암호화
            if (err) reject(err); //reject = 오류
            resolve(buf.toString('base64')); //resolve()
        });
    });
    const createHashedPassword = (plainPassword) => //암호화안된 비밀번호를 인자로 받아와 암호화
    new Promise(async (resolve, reject) => {
        const salt = await createSalt();
        crypto.pbkdf2(plainPassword, salt, 9999, 64, 'sha512', (err, key) => {
            if (err) reject(err);
            resolve({ password: key.toString('base64'), salt });
        });
    });

    // // resolve()의 결과 값 buf.toString('base64')인 솔트값을 resolveSalt로 받음
    // createSalt().then(function(resolveSalt){ // than()을 이용하여 처리결과 받음
    //   console.log(resolveSalt);
    // })
    createHashedPassword(password).then(function(resolveEncryp){
      // console.log("############################",resolveEncryp); 

      db.query(`select name, email from user where name like ? or email like ?;`
    , [name, email]
    , function (error, result) {
      if (error) throw error;

      //name or email 중복 x
      if (result == "" || result == null || result == undefined || (result != null && typeof result == "object" && !Object.keys(result).length)) {
        db.query(`
                  INSERT INTO user (username, name, email, password, salt) values (?,?,?,?,?)
                `
          , [username, name, email, resolveEncryp.password, resolveEncryp.salt]
          , function (error, result2) {
            if (error) throw error;
            res.writeHead(302, { Location: `/` });
            res.end();
          })
      } else { //name or email 중복 o
        if(result[0].name == name){
          res.send(`<script type="text/javascript">alert("닉네임이 겹칩니다.");
          window.history.back();
          </script>`);
        } else if( result[0].email == email) {
          res.send(`<script type="text/javascript">alert("이미 등록된 이메일입니다.");
          window.history.back();
          </script>`);
        } else {
          res.send(`<script type="text/javascript">alert("오류발생");
          window.history.back();
          </script>`);
        }
      }
    })
    });

}

// 로그인 process
exports.new_process = function (req, res) { 
  var body = req.body;
  var name = body.name;
  var password = body.password;
  let hashPassword = null;
  db.query(`SELECT salt FROM user WHERE name like ?`
  , [name]
  , function(error, result){
    if(error) throw error;
    if (!result) {
      //해당id없음
    } else {
      hashPassword = crypto.createHash("sha512").update(password + result.salt).digest("hex");
      if(hashPassword === password) {
        console.log("비밀번호 일치");
        res.redirect("/");
      } else {
        //로그인 실패
        console.log("비밀번호 불일치 ", hashPassword);
        res.redirect("/join/new");
      }
    }
  }
  )
  let salt = Math.round((new Date().valueOf() * Math.random())) + "";
}
