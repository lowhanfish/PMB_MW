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
        SELECT reg_as.*,
        master_pendidikan_jurusan.uraian as pendidikan_jurusan_uraian
        FROM reg_as
        JOIN master_pendidikan_jurusan
        ON master_pendidikan_jurusan.pendidikan_jurusan_id = reg_as.pendidikan_jurusan_id
        WHERE
        (reg_as.gelombang_id = `+form.gelombang_id+` AND reg_as.tahun_id = `+form.tahun_id+`) AND reg_as.userId='`+req.user._id+`'

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
    // console.log(req.body);
    // res.send('OK')
    
    var pb = req.body.pb;
    
    query = `
    SELECT * FROM reg_as
    WHERE (tahun_id = `+pb.tahun_id+` AND gelombang_id = `+pb.gelombang_id+`) AND userId = '`+req.user._id+`'
    `;
    db.query(query, (err, row)=>{
        if(row.length <= 0) {
            console.log("Tambahmi")
            addData(req,res)
        }else{
            console.log("editmi")
            editData(req,res)
        }
    })
});

function addData(req,res){
    var form = req.body.form;
    var pb = req.body.pb;

     let insert = `INSERT INTO reg_as (nama_sekolah, nis, thn_lulus, pendidikan_id, pendidikan_jurusan_id, nilai_un, tahun_id, gelombang_id, userId, createdAt)
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

function editData(req,res){
    // console.log(req.body);
    var form = req.body.form;
    var pb = req.body.pb;

    query = `
    UPDATE reg_as SET
    nama_sekolah = '`+form.nama_sekolah+`',
    nis = '`+form.nis+`',
    thn_lulus = `+form.thn_lulus+`,
    pendidikan_id = `+form.pendidikan_id+`,
    pendidikan_jurusan_id = `+form.pendidikan_jurusan_id+`,
    nilai_un = `+form.nilai_un+`,
    editedAt = NOW()

    WHERE reg_as_id = `+form.reg_as_id+`
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