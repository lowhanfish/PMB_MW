const express = require('express');
var db = require('../../db/MySql/dbutama');

var kirimEmail = require('../../library/kirimEmail');

const router = express.Router();


router.post('/',(req,res)=>{
    console.log(req.body)
    let insert = `
        SELECT
        syk_dokpersiapan.*
        FROM syk_dokpersiapan
        WHERE
        (syk_dokpersiapan.tahun_id = `+req.body.tahun_id+`) 
    `

   db.query(insert, (err, row)=>{
       if(err) {
           console.log(err);
           res.send(err);
       }else{
           res.send(row);
       }
   })
   // console.log(req.body);
});





module.exports = router;