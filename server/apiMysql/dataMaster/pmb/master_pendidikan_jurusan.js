const express = require('express');
var db = require('../../../db/MySql/dbutama');

const fs = require('fs');

var multer=require("multer");
var upload = require('../../../db/multer/pdf');

var uniqid = require('uniqid');
const router = express.Router();


router.get('/', (req, res) => {

    let query = `
        SELECT
        master_pendidikan_jurusan.*
        FROM master_pendidikan_jurusan
       
    `
    db.query(query, (err, row)=>{
        if (err) {
            res.json(err)
        }else{
            res.json(row)
        }
    })
});


router.post('/', (req, res) => {
    // console.log("HY I CALL DIA")
    // console.log(req.body)
    var query_filter = ''
    var uraian = req.body.uraian
    if (uraian == null || uraian==undefined || uraian == '' || uraian == ' ' || uraian == '-') {
        query_filter = ''
    }else{
        query_filter = `master_pendidikan_jurusan.uraian LIKE '%`+uraian+`%'  AND `
    }

    let view = ` 
    SELECT *
    FROM master_pendidikan_jurusan 
    WHERE 
    `+query_filter+` master_pendidikan_jurusan.pendidikan_id = `+req.body.pendidikan_id+`
    LIMIT 10
    `;

    db.query(view, (err, row)=>{
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
    var query_filter = ''


    var pendidikan_id = req.body.pendidikan_id
    // console.log('Pendidikannya adalah: '+req.body)

    if (pendidikan_id == null || pendidikan_id==undefined || pendidikan_id == '' || pendidikan_id == ' ' || pendidikan_id == '-') {
        query_filter = ''
    }else{
        query_filter = "AND master_pendidikan.pendidikan_id = "+pendidikan_id+""
    }





    let jml_data = `
        SELECT
        master_pendidikan_jurusan.*,
        master_pendidikan.uraian as pendidikan_uraian

        FROM master_pendidikan_jurusan
        LEFT JOIN master_pendidikan
        ON master_pendidikan_jurusan.pendidikan_id = master_pendidikan.pendidikan_id

        WHERE
        master_pendidikan_jurusan.uraian LIKE '%`+cari+`%' 
        `+query_filter+`
    `

    let view = `
        SELECT
        master_pendidikan_jurusan.*,
        master_pendidikan.uraian as pendidikan_uraian
        FROM master_pendidikan_jurusan
        LEFT JOIN master_pendidikan
        ON master_pendidikan_jurusan.pendidikan_id = master_pendidikan.pendidikan_id

        WHERE
        master_pendidikan_jurusan.uraian LIKE '%`+cari+`%'
        `+query_filter+`

        LIMIT `+data_star+`,`+data_batas+`
    `
    db.query(jml_data, (err, row)=>{
        if (err) {
            console.log(err)
            res.json(err)
        }else{
            halaman = Math.ceil(row.length/data_batas);
            if(halaman<1){halaman = 1}
            // ========================
            db.query(view, (err, result)=>{
                if (err) {console.log(err); res.json(err)}
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
router.post('/addData', (req,res)=>{
    console.log(req.body)
     let insert = `INSERT INTO master_pendidikan_jurusan (uraian, pendidikan_id)
    VALUES (
        '`+req.body.uraian+`',
        `+req.body.pendidikan_id+`
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

router.post('/editData',(req,res)=>{
    console.log(req.body)
    query = `
    UPDATE master_pendidikan_jurusan SET
    uraian = '`+req.body.uraian+`',
    pendidikan_id = `+req.body.pendidikan_id+`

    WHERE pendidikan_jurusan_id = '`+req.body.pendidikan_jurusan_id+`'
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
        DELETE FROM master_pendidikan_jurusan WHERE pendidikan_jurusan_id = `+req.body.pendidikan_jurusan_id+`;
    `;
    db.query(query, (err, row)=>{
        if(err){
            res.send(err);
        }else{
            res.send(row);
        }
    });
})












router.post('/view_list', (req, res) => {
    var data_batas = req.body.page_limit;
    var data_star = (req.body.data_ke - 1)* data_batas;
    var cari = req.body.cari_value;
    var halaman = 1;
    var query_filter = ''


    console.log(req.body)


    var pendidikan_id = req.body.pendidikan_id
    // console.log('Pendidikannya adalah: '+req.body)

    if (pendidikan_id == null || pendidikan_id==undefined || pendidikan_id == '' || pendidikan_id == ' ' || pendidikan_id == '-') {
        query_filter = ''
    }else{
        query_filter = "AND master_pendidikan.pendidikan_id = "+pendidikan_id+""
    }
    let jml_data = `
        SELECT
        master_pendidikan_jurusan.*,
        master_pendidikan.uraian as pendidikan_uraian

        FROM master_pendidikan_jurusan
        LEFT JOIN master_pendidikan
        ON master_pendidikan_jurusan.pendidikan_id = master_pendidikan.pendidikan_id

        WHERE
        master_pendidikan_jurusan.uraian LIKE '%`+cari+`%' 
        `+query_filter+`
    `

    let view = `
        SELECT
        master_pendidikan_jurusan.*,
        master_pendidikan.uraian as pendidikan_uraian
        FROM master_pendidikan_jurusan
        LEFT JOIN master_pendidikan
        ON master_pendidikan_jurusan.pendidikan_id = master_pendidikan.pendidikan_id

        WHERE
        master_pendidikan_jurusan.uraian LIKE '%`+cari+`%'
        `+query_filter+`

        LIMIT `+data_star+`,`+data_batas+`
    `
    db.query(jml_data, (err, row)=>{
        if (err) {
            console.log(err)
            res.json(err)
        }else{
            halaman = Math.ceil(row.length/data_batas);
            if(halaman<1){halaman = 1}
            // ========================
            db.query(view, (err, result)=>{
                if (err) {console.log(err); res.json(err)}
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


router.get('/autocomplete_pendidikan_jurusan', (req, res) => {
    console.log(req.query.q)

    let view = ` 
    SELECT *
    FROM master_pendidikan_jurusan 
    WHERE 
    (uraian LIKE '%`+req.query.q+`%' AND pendidikan_id = `+req.query.pendidikan_id+`)
    LIMIT 10
    `;

    db.query(view, (err, row)=>{
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