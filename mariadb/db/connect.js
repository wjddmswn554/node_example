var mysql = require('mysql');

module.exports = function () {
  var config = require('../db/info');
  var pool = mysql.createPool({
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database
  });

  return {
    getConnection: function (callback) {
      pool.getConnection(callback);
    },
    end: function(callback){
      pool.end(callback);
    }
  }
}();
