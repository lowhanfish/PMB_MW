const express = require('express');
var db = require('../../db/MySql/dbutama');

const fs = require('fs');

var multer=require("multer");
var upload = require('../../db/multer/pdf');

var uniqid = require('uniqid');
const router = express.Router();

router.post('/view', (req, res) => {
    var data_batas = req.body.page_limit;
    var data_star = (req.body.data_ke - 1)* data_batas;
    var cari = req.body.cari_value;
    var halaman = 1;

    let jml_data = `
        SELECT
        syk_infofkbiaya.*
        FROM syk_infofkbiaya
        WHERE
        syk_infofkbiaya.tahun_id = `+req.body.tahun_id+`
    `

    let view = `
        SELECT
        syk_infofkbiaya.*
        FROM syk_infofkbiaya
        WHERE
        syk_infofkbiaya.tahun_id = `+req.body.tahun_id+`
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

router.post('/addData',upload.single("file"), (req,res)=>{
    var pb = JSON.parse(req.body.pb)
    
    var query = `
    SELECT * FROM syk_infofkbiaya
    WHERE tahun_id = `+pb.tahun_id+`
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

     let insert = `INSERT INTO syk_infofkbiaya (img, tahun_id)
    VALUES (
        '`+file.filename+`',
        `+pb.tahun_id+`
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

    console.log(req.body)


    query = `
    UPDATE syk_infofkbiaya SET
    img = '`+file.filename+`'
    WHERE tahun_id = `+pb.tahun_id+`
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