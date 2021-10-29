var mysql = require('mysql');

var db = mysql.createConnection({ //createConnection  createPool
    host:'localhost',
    port: 3307,
    user:'root',
    password:'root',
    database:'smt',
    dateStrings: 'date' // mysql의 timestamp 형식을 연도/월/일 시/분/초 만 걸러내줌
  });
  db.connect();
  
  module.exports = db;