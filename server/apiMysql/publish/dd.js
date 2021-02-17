const express = require('express');
var db = require('../../db/MySql/dbutama');

const fs = require('fs');

var multer=require("multer");
var upload = require('../../db/multer/pdf');

var uniqid = require('uniqid');
const router = express.Router();



router.get('/', (req, res) => {

    let query = `
        SELECT
        reg_as.*
        FROM reg_as
    `
    db.query(query, (err, row)=>{
        if (err) {
            res.json(err)
        }else{
            res.json(row)
        }
    })
});





// router.post('/addData', (req,res)=>{
router.post('/addData',upload.single("file"), (req,res)=>{
    addData(req,res)
});

router.post('/editData',upload.single("file"), (req,res)=>{
    query = `
    UPDATE reg_as SET
    uraian = '`+req.body.uraian+`'

    WHERE agama_id = '`+req.body.agama_id+`'
    `;
    db.query(query, (err, row)=>{
        if(err) {
            console.log(err);
            res.send(err);
        }else{
            res.send(row);
        }
    })


    // console.log(req.body);


    // console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
})


router.post('/removeData', (req, res)=> {
    var file = req.body.file
    hapus_file(file);

    var query = `
        DELETE FROM reg_as WHERE agama_id = `+req.body.id+`;
    `;
    db.query(query, (err, row)=>{
        if(err){
            res.send(err);
        }else{
            res.send(row);
        }
    });
})

function hapus_file(file){
    const path = 'uploads/'+file;

    fs.unlink(path, (err) => {
        if (err) {
          console.error(err)
          return
        }
    })

}



function addData(req,res){
    var form = req.body.form;
    var pb = req.body.pb;

     let insert = `INSERT INTO reg_as (nama_sekolah, nis, thn_lulus, pendidikan_id, pendidikan_jurusan_id, nilai_un, tahun_id, gelombang_id, createdAt)
    VALUES (
        '`+form.nama_sekolah+`',
        '`+form.nis+`',
        `+form.thn_lulus+`,
        `+form.pendidikan_id+`,
        `+form.pendidikan_jurusan_id+`,
        `+form.nilai_un+`,
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
            console.log(row);
            res.send(row);
        }
    })
}

module.exports = router;