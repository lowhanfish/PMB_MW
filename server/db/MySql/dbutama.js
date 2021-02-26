var mysql = require('mysql');
var db = mysql.createConnection({
  host     : '127.0.0.1',
  user     : 'root',
  password : '',
  database : 'pmb'
});

// var mysql = require('mysql');
// var db = mysql.createConnection({
//   host     : 'localhost',
//   user     : 'unia7261_unia7261',
//   password : 'menang1B',
//   database : 'unia7261_pmb',
//   port: 3306,
//   debug: true
// });

db.connect((err)=>{
    if(err){
        console.log(err);
    }else{
        console.log('Terkoneksi dengan DATABASE PMB');
    }
})

module.exports = db;