var sql = require('./sql/select')();


module.exports = function () {
  return {
    connect : function(){
      console.log('** DB con Started');

      sql.select(function(err, data){
        if (err) console.log(err);
        else console.log(data);

        sql.pool.end(function(err){
          if (err) console.log(err);
          else {
            console.log('** Finished');
          }
        });
      });
    }
  }
};
