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
        SELECT reg_jp.*,
        master_pendidikan_jurusan.uraian as pendidikan_jurusan_uraian
        FROM reg_jp
        JOIN master_pendidikan_jurusan
        ON master_pendidikan_jurusan.pendidikan_jurusan_id = reg_jp.pendidikan_jurusan_id
        WHERE
        (reg_jp.gelombang_id = `+form.gelombang_id+` AND reg_jp.tahun_id = `+form.tahun_id+`) AND reg_jp.userId='`+req.user._id+`'

    `
    db.query(query, (err, row)=>{
        if (err) {
            res.json(err)
        }else{
            res.json(row)
        }
    })

});

router.post('/addData',upload.single("file"), (req,res)=>{

    console.log(req.body);
    
});

function addData(req,res){
    var form = req.body.form;
    var pb = req.body.pb;

     let insert = `INSERT INTO reg_jp (prodi_id, tahun_id, gelombang_id, pilihan, userId, createdAt)
    VALUES (
        `+form.prodi_id+`,
        `+pb.tahun_id+`,
        `+pb.gelombang_id+`,
        `+form.pilihan+`,
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

function editData(req,res){
    // console.log(req.body);
    var form = req.body.form;
    var pb = req.body.pb;

    query = `
    UPDATE reg_jp SET
    nama_sekolah = '`+form.nama_sekolah+`',
    nis = '`+form.nis+`',
    thn_lulus = `+form.thn_lulus+`,
    pendidikan_id = `+form.pendidikan_id+`,
    pendidikan_jurusan_id = `+form.pendidikan_jurusan_id+`,
    nilai_un = `+form.nilai_un+`,
    editedAt = NOW()

    WHERE reg_jp_id = `+form.reg_jp_id+`
    `;
    db.query(query, (err, row)=>{
        if(err) {
            console.log(err);
            res.send(err);
        }else{
            res.send(row);
        }
    })
}

module.exports = router;