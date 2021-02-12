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
        master_kecamatan.*
        FROM master_kecamatan
        WHERE kabupaten_id = `+req.body.kabupaten_id+`
       
    `
    db.query(query, (err, row)=>{
        if (err) {
            res.json(err)
        }else{
            res.json(row)
        }
    })
});

// router.post('/kec', (req, res) => {

//     let query = `
//         SELECT
//         master_lumbung_pangan.*
//         FROM master_lumbung_pangan
//         WHERE kecamatan_id = `+req.body.kecamatan_id+`
       
//     `
//     db.query(query, (err, row)=>{
//         if (err) {
//             console.log(err);
//             res.json(err)
//         }else{
//             res.json(row)
//         }
//     })
// });

router.post('/view_kec', (req, res) => {
    var data_batas = 8;
    var data_star = (req.body.data_ke - 1)* data_batas;
    var cari = req.body.cari_value;
    var halaman = 1;

    let jml_data = `
        SELECT
        master_kecamatan.*,
        master_provinsi.kode_provinsi as kode_provinsi_prov

        FROM master_kecamatan

        JOIN master_provinsi
        ON master_provinsi.provinsi_id = master_kecamatan.provinsi_id

        WHERE
        master_kecamatan.nama_kecamatan LIKE '%`+cari+`%'
    `

    let view = `
        SELECT
        master_kecamatan.*,
        master_provinsi.kode_provinsi as kode_provinsi_prov,
        master_kabupaten.kode_kabupaten as kode_kabupaten_kab

        FROM master_kecamatan

        JOIN master_provinsi
        ON master_provinsi.provinsi_id = master_kecamatan.provinsi_id

        LEFT JOIN master_kabupaten
        ON master_kabupaten.kabupaten_id = master_kecamatan.kabupaten_id

        WHERE
        master_kecamatan.nama_kecamatan LIKE '%`+cari+`%'

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

router.post('/view', (req, res) => {
    var data_batas = 8;
    var data_star = (req.body.data_ke - 1)* data_batas;
    var cari = req.body.cari_value;
    var halaman = 1;

    let jml_data = `
        SELECT
        master_kecamatan.*,
        master_provinsi.kode_provinsi as kode_provinsi_prov

        FROM master_kecamatan

        JOIN master_provinsi
        ON master_provinsi.provinsi_id = master_kecamatan.provinsi_id

        WHERE
        master_kecamatan.nama_kecamatan LIKE '%`+cari+`%'
    `

    let view = `
        SELECT
        master_kecamatan.*,
        master_provinsi.kode_provinsi as kode_provinsi_prov,
        master_kabupaten.kode_kabupaten as kode_kabupaten_kab

        FROM master_kecamatan

        JOIN master_provinsi
        ON master_provinsi.provinsi_id = master_kecamatan.provinsi_id

        LEFT JOIN master_kabupaten
        ON master_kabupaten.kabupaten_id = master_kecamatan.kabupaten_id

        WHERE
        master_kecamatan.nama_kecamatan LIKE '%`+cari+`%'

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
     let insert = `INSERT INTO master_kecamatan (provinsi_id, kabupaten_id, kode_kecamatan, nama_kecamatan)
    VALUES (
        `+req.body.provinsi_id+` ,
        `+req.body.kabupaten_id+` ,
        '`+req.body.kode_kecamatan+`' ,
        '`+req.body.nama_kecamatan+`'
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
    UPDATE kecamatan SET
    provinsi_id = `+req.body.provinsi_id+`,
    kabupaten_id = `+req.body.kabupaten_id+`,
    kode_kecamatan = '`+req.body.kode_kecamatan+`',
    nama_kecamatan = '`+req.body.nama_kecamatan+`',
    kode_pangan = '`+req.body.kode_pangan+`'

    WHERE kecamatan_id = '`+req.body.kecamatan_id+`'
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
        DELETE FROM kecamatan WHERE kecamatan_id = `+req.body.id+`;
    `;
    db.query(query, (err, row)=>{
        if(err){
            res.send(err);
        }else{
            res.send(row);
        }
    });
})

router.get('/autocomplete', (req, res) => {

    let query = `
        SELECT
        master_kecamatan.*,
        master_kabupaten.nama_kabupaten

        FROM master_kecamatan

        JOIN master_kabupaten
        ON master_kabupaten.kabupaten_id = master_kecamatan.kabupaten_id

        WHERE 
        master_kecamatan.nama_kecamatan LIKE '%`+req.query.q+`%' 
        LIMIT 9
    `
    db.query(query, (err, row)=>{
        if (err) {
            res.json(err)
        }else{
            res.json(row)
        }
    })
});


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
