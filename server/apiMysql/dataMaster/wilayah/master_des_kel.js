const express = require('express');
var db = require('../../../db/MySql/dbutama');

const fs = require('fs');

var multer=require("multer");
var upload = require('../../../db/multer/pdf');

var uniqid = require('uniqid');
const router = express.Router();


router.post('/', (req, res) => {

    let query = `
        SELECT
        master_des_kel.*
        FROM master_des_kel
        WHERE kecamatan_id = `+req.body.kecamatan_id+`
       
    `
    db.query(query, (err, row)=>{
        if (err) {
            res.json(err)
        }else{
            res.json(row)
        }
    })
});




router.post('/view', (req, res) => {
    var data_batas = 8;
    var data_star = (req.body.data_ke - 1)* data_batas;
    var cari = req.body.cari_value;
    var halaman = 1;

    let jml_data = `
        SELECT
        master_des_kel.*,
        master_kecamatan.kode_kecamatan as kode_kecamatan_kec

        FROM master_des_kel

        JOIN master_kecamatan
        ON master_kecamatan.kecamatan_id = master_des_kel.kecamatan_id

        WHERE
        master_des_kel.nama_des_kel LIKE '%`+cari+`%'
    `

    let view = `
        SELECT
        master_des_kel.*,
        master_kecamatan.kode_kecamatan as kode_kecamatan_kec


        FROM master_des_kel

        JOIN master_kecamatan
        ON master_kecamatan.kecamatan_id = master_des_kel.kecamatan_id

        WHERE
        master_des_kel.nama_des_kel LIKE '%`+cari+`%'

        LIMIT `+data_star+`,`+data_batas+`
    `
    db.query(jml_data, (err, row)=>{
        if (err) {
            res.json(err)
        }else{
            halaman = Math.ceil(row.length/data_batas);
            if(halaman<1){halaman = 1}
            // ========================
            db.query(view, (err, result)=>{
                if (err) {res.json(err)}
                else{
                    halaman = Math.ceil(row.length/data_batas);
                    if(halaman<1){halaman = 1}
                    res.json({
                        data : result,
                        jml_data : halaman
                    })
                }
            })
            // ========================

        }
    })
});

// router.post('/addData', (req,res)=>{
router.post('/addData',upload.single("file"), (req,res)=>{
     let insert = `INSERT INTO master_des_kel (kecamatan_id, nama_des_kel, kode_des_kel)
    VALUES (
        `+req.body.kecamatan_id+` ,
        '`+req.body.nama_des_kel+`' ,
        '`+req.body.kode_des_kel+`'
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
    // console.log(req.body);
});

router.post('/editData',upload.single("file"), (req,res)=>{
    query = `
    UPDATE des_kel SET
    kecamatan_id = `+req.body.kecamatan_id+`,
    nama_des_kel = '`+req.body.nama_des_kel+`',
    kode_des_kel = '`+req.body.kode_des_kel+`',
    kode_pangan = '`+req.body.kode_pangan+`'

    WHERE des_kel_id = `+req.body.des_kel_id+`
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
        DELETE FROM des_kel WHERE des_kel_id = `+req.body.id+`;
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

module.exports = router;
