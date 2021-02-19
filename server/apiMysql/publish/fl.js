const express = require('express');
var db = require('../../db/MySql/dbutama');

const fs = require('fs');

var multer=require("multer");
var upload = require('../../db/multer/pdf');

var uniqid = require('uniqid');
const router = express.Router();

router.post('/view', (req, res) => {
    var form =  req.body.pb

    // console.log(req.body)

    let query = `
        SELECT 
        reg_fl.*
       
        FROM reg_fl

        WHERE 
        reg_fl.userId = '`+req.user._id+`' AND 
        reg_fl.tahun_id = `+form.tahun_id+` AND
        reg_fl.gelombang_id = `+form.gelombang_id+`

    `
    db.query(query, (err, row)=>{
        if (err) {
            res.json(err)
        }else{
            res.json(row)
        }
    })

});

router.post('/addFerify', (req,res)=>{

    query = `
    UPDATE reg_fl SET
    stat_pembayaran = 1,
    keterangan = 'Menunggu Proses Pemeriksaan'
    WHERE reg_fl_id = `+req.body.reg_fl_id+`
    `;
    db.query(query, (err, row)=>{
        if(err) {
            console.log(err);
            res.send(err);
        }else{
            hapus_file(req.body.fileOld)
            res.send(row);
        }
    })

    // res.send('OK')
});

router.post('/addData',upload.single("file"), (req,res)=>{
    var pb = JSON.parse(req.body.pb)
    
    var query = `
    SELECT * FROM reg_fl
    WHERE (tahun_id = `+pb.tahun_id+` AND gelombang_id = `+pb.gelombang_id+`) AND userId = '`+req.user._id+`'
    `;

    db.query(query, (err, row)=>{
        if (err) {
            console.log(err)
            res.send(err)
        } else {
            if(row.length <= 0) {
                addData(req,res)
            }else{
                console.log("editmi")
                // res.send("OK")
                editData(req,res)
            }
        }
    })

    // res.send('OK')
});

function addData(req,res){
    var pb = JSON.parse(req.body.pb)
    var file = req.file

    console.log(pb)

     let insert = `INSERT INTO reg_fl (`+req.body.field+`, tahun_id, gelombang_id, userId, createdAt)
    VALUES (
        '`+file.filename+`',
        `+pb.tahun_id+`,
        `+pb.gelombang_id+`,
        '`+req.user._id+`',
        NOW()
        )
    `
    db.query(insert, (err, row)=>{
        if(err) {
            console.log('errrrooorrr');
            console.log(err);
            res.send(err);
        }else{
            // console.log(row);
            res.send(row);
        }
    })
}

function editData(req,res){
    var pb = JSON.parse(req.body.pb)
    var file = req.file


    query = `
    UPDATE reg_fl SET
    `+req.body.field+` = '`+file.filename+`'
    WHERE reg_fl_id = `+req.body.reg_fl_id+`
    `;
    db.query(query, (err, row)=>{
        if(err) {
            console.log(err);
            res.send(err);
        }else{
            hapus_file(req.body.fileOld)
            res.send(row);
        }
    })
}



function hapus_file(file){
    const path = './uploads/'+file;

    fs.unlink(path, (err) => {
        if (err) {
          console.error(err)
          return
        }
    })

}

module.exports = router;