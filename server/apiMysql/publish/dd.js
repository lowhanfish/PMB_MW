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
        SELECT reg_dd.*,
        master_jenis_kel.uraian as jenis_kelamin_uraian,
        master_agama.uraian as agama_uraian,
        master_provinsi.nama_provinsi,
        master_kabupaten.nama_kabupaten,
        master_kecamatan.nama_kecamatan,
        master_des_kel.nama_des_kel
        FROM reg_dd

        JOIN master_jenis_kel
        ON master_jenis_kel.jenis_kel_id = reg_dd.jenis_kel_id

        JOIN master_agama
        ON master_agama.agama_id = reg_dd.agama_id

        JOIN master_provinsi
        ON master_provinsi.provinsi_id = reg_dd.provinsi_id

        JOIN master_kabupaten
        ON master_kabupaten.kabupaten_id = reg_dd.kabupaten_id

        JOIN master_kecamatan
        ON master_kecamatan.kecamatan_id = reg_dd.kecamatan_id

        JOIN master_des_kel
        ON master_des_kel.des_kel_id = reg_dd.des_kel_id

        WHERE 
        reg_dd.userId = '`+req.user._id+`' AND 
        tahun_id = `+form.tahun_id+` AND
        gelombang_id = `+form.gelombang_id+`

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
    SELECT * FROM reg_dd
    WHERE (tahun_id = `+pb.tahun_id+` AND gelombang_id = `+pb.gelombang_id+`) AND userId = '`+req.user._id+`'
    `;
    db.query(query, (err, row)=>{
        if(row.length <= 0) {
            console.log("Tambahmi")
            addData(req,res)
        }else{
            // console.log("editmi")
            // res.send("OK")
            editData(req,res)
        }
    })
});

function addData(req,res){
    var form = req.body.form;
    var pb = req.body.pb;

     let insert = `INSERT INTO reg_dd (nama, no_ktp, tpt_lahir, tgl_lahir, jenis_kel_id, agama_id, hobby, alamat, provinsi_id, kabupaten_id, kecamatan_id, des_kel_id, hp, tahun_id, gelombang_id, userId, createdAt)
    VALUES (
        '`+form.nama+`',
        '`+form.no_ktp+`',
        '`+form.tpt_lahir+`',
        '`+form.tgl_lahir+`',
        `+form.jenis_kel_id+`,
        `+form.agama_id+`,
        '`+form.hobby+`',
        '`+form.alamat+`',
        `+form.provinsi_id+`,
        `+form.kabupaten_id+`,
        `+form.kecamatan_id+`,
        `+form.des_kel_id+`,
        '`+form.hp+`',
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
    UPDATE reg_dd SET
    nama = '`+form.nama+`',
    no_ktp = '`+form.no_ktp+`',
    tpt_lahir = '`+form.tpt_lahir+`',
    tgl_lahir = '`+form.tgl_lahir+`',
    jenis_kel_id = `+form.jenis_kel_id+`,
    agama_id = `+form.agama_id+`,
    hobby = '`+form.hobby+`',
    alamat = '`+form.alamat+`',
    provinsi_id = `+form.provinsi_id+`,
    kabupaten_id = `+form.kabupaten_id+`,
    kecamatan_id = `+form.kecamatan_id+`,
    des_kel_id = `+form.des_kel_id+`,
    hp = '`+form.hp+`',
    editedAt = NOW()

    WHERE reg_dd_id = `+form.reg_dd_id+`
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