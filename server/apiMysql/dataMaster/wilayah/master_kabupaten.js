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
        master_kabupaten.*
        FROM master_kabupaten
        WHERE provinsi_id = `+req.body.provinsi_id+`
       
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
        master_kabupaten.*,
        master_provinsi.kode_provinsi as kode_provinsi_prov

        FROM master_kabupaten

        JOIN master_provinsi
        ON master_provinsi.provinsi_id = master_kabupaten.provinsi_id

        WHERE
        master_kabupaten.nama_kabupaten LIKE '%`+cari+`%'
    `

    let view = `
        SELECT
        master_kabupaten.*,
        master_provinsi.kode_provinsi as kode_provinsi_prov

        FROM master_kabupaten

        JOIN master_provinsi
        ON master_provinsi.provinsi_id = master_kabupaten.provinsi_id

        WHERE
        master_kabupaten.nama_kabupaten LIKE '%`+cari+`%'

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
     let insert = `INSERT INTO master_kabupaten (provinsi_id, kode_kabupaten, nama_kabupaten)
    VALUES (
        '`+req.body.provinsi_id+`' ,
        '`+req.body.kode_kabupaten+`' ,
        '`+req.body.nama_kabupaten+`'
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
    UPDATE master_kabupaten SET
    provinsi_id = `+req.body.provinsi_id+`,
    kode_kabupaten = '`+req.body.kode_kabupaten+`',
    nama_kabupaten = '`+req.body.nama_kabupaten+`'

    WHERE kabupaten_id = '`+req.body.kabupaten_id+`'
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
        DELETE FROM master_kabupaten WHERE kabupaten_id = `+req.body.id+`;
    `;
    db.query(query, (err, row)=>{
        if(err){
            res.send(err);
        }else{
            res.send(row);
        }
    });
})





// router.get('/autocomplete_kab', (req, res) => {
//     console.log(req.query.q)

//     let view = ` 
//     SELECT *
//     FROM master_kabupaten 
//     WHERE 
//     nama_provinsi LIKE '%`+req.query.q+`%' AND
//     provinsi_id
//     LIMIT 10
//     `;

//     db.query(view, (err, row)=>{
//         if (err) {
//             res.json(err)
//         }else{
//             res.json(row)
//         }
//     })


// });









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
