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
//   user     : 'stikesm1_stikes',
//   password : 'stikesmw123#',
//   database : 'stikesm1_daftar_online',
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