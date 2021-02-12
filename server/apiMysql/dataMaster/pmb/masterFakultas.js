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
        master_fakultas.*
        FROM master_fakultas
       
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
        master_fakultas.*
        FROM master_fakultas
        WHERE
        master_fakultas.uraian LIKE '%`+cari+`%'
    `

    let view = `
        SELECT
        master_fakultas.*
        FROM master_fakultas
        WHERE
        master_fakultas.uraian LIKE '%`+cari+`%'

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
router.post('/addData',(req,res)=>{
     let insert = `INSERT INTO master_fakultas (uraian, singkatan)
    VALUES (
        '`+req.body.uraian+`' ,
        '`+req.body.singkatan+`'
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

router.post('/editData', (req,res)=>{
    query = `
    UPDATE master_fakultas SET
    uraian = '`+req.body.uraian+`',
    singkatan = '`+req.body.singkatan+`'

    WHERE id = '`+req.body.id+`'
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
        DELETE FROM master_fakultas WHERE id = `+req.body.id+`;
    `;
    db.query(query, (err, row)=>{
        if(err){
            res.send(err);
        }else{
            res.send(row);
        }
    });
})



router.get('/list', (req, res)=> {
    var file = req.body.file
    hapus_file(file);

    var query = `
        SELECT * FROM master_fakultas
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