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
        SELECT 
        reg_ot.*
       
        FROM reg_ot

        WHERE 
        reg_ot.userId = '`+req.user._id+`' AND 
        reg_ot.tahun_id = `+form.tahun_id+` AND
        reg_ot.gelombang_id = `+form.gelombang_id+`

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

    
    var query = `
    SELECT * FROM reg_ot
    WHERE (tahun_id = `+pb.tahun_id+` AND gelombang_id = `+pb.gelombang_id+`) AND userId = '`+req.user._id+`'
    `;



    console.log(query)


    db.query(query, (err, row)=>{
        if (err) {
            console.log(err)
            res.send(err)
        } else {
            if(row.length <= 0) {
                console.log("Tambahmi")
                addData(req,res)
            }else{
                console.log("editmi")
                // res.send("OK")
                editData(req,res)
            }
        }
    })
});

function addData(req,res){
    var form = req.body.form;
    var pb = req.body.pb;
    console.log(req.body)

     let insert = `INSERT INTO reg_ot (nm_ayah, nm_ibu, pendidikan_ayah, pendidikan_ibu, pekerjaan_ayah, pekerjaan_ibu, alamat_ot, hp_ot, penghasilan, provinsi_id, kabupaten_id, kecamatan_id, des_kel_id, tahun_id, gelombang_id, userId, createdAt)
    VALUES (
        '`+form.nm_ayah+`',
        '`+form.nm_ibu+`',
        `+form.pendidikan_ayah+`,
        `+form.pendidikan_ibu+`,
        '`+form.pekerjaan_ayah+`',
        '`+form.pekerjaan_ibu+`',
        '`+form.alamat_ot+`',
        '`+form.hp_ot+`',
        `+form.penghasilan+`,
        `+form.provinsi_id+`,
        `+form.kabupaten_id+`,
        `+form.kecamatan_id+`,
        `+form.des_kel_id+`,


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
            // console.log(row);
            res.send(row);
        }
    })
}

function editData(req,res){
    // console.log(req.body);
    var form = req.body.form;
    var pb = req.body.pb;

    query = `
    UPDATE reg_ot SET
    nm_ayah = '`+form.nm_ayah+`',
    nm_ibu = '`+form.nm_ibu+`',
    pendidikan_ayah = `+form.pendidikan_ayah+`,
    pendidikan_ibu = `+form.pendidikan_ibu+`,
    pekerjaan_ayah = '`+form.pekerjaan_ayah+`',
    pekerjaan_ibu = '`+form.pekerjaan_ibu+`',
    alamat_ot = '`+form.alamat_ot+`',
    hp_ot = '`+form.hp_ot+`',
    penghasilan = `+form.penghasilan+`,

    provinsi_id = `+form.provinsi_id+`,
    kabupaten_id = `+form.kabupaten_id+`,
    kecamatan_id = `+form.kecamatan_id+`,
    des_kel_id = `+form.des_kel_id+`,
    editedAt = NOW()

    WHERE reg_ot_id = `+form.reg_ot_id+`
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