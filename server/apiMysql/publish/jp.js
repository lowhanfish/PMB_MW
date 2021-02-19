const express = require('express');
var db = require('../../db/MySql/dbutama');

const fs = require('fs');

var multer=require("multer");
var upload = require('../../db/multer/pdf');

var uniqid = require('uniqid');
const router = express.Router();



router.post('/view', (req, res) => {
    var form =  req.body.pb

    console.log(req.body)

    let query = `
        SELECT 
        master_prodi.prodi_id as prodi_id,
        master_prodi.uraian as master_prodi_uraian,
        master_program.program_id,
        master_program.uraian as program_uraian,
        master_program.singkatan as program_singkatan,
        master_fakultas.uraian as fakultas_uraian

        FROM reg_jp

        LEFT JOIN master_prodi
        ON master_prodi.prodi_id = reg_jp.prodi_id

        LEFT JOIN master_program
        ON master_program.program_id = master_prodi.program_id

        LEFT JOIN master_fakultas
        ON master_fakultas.id = master_prodi.fakultas_id

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
    var data = req.body.form;
    var pb = req.body.pb;

    console.log(req.body)

    var query = `
        DELETE FROM reg_jp 
        WHERE 
        reg_jp.tahun_id = `+pb.tahun_id+` AND gelombang_id = `+pb.gelombang_id+` AND userId = '`+req.user._id+`'
    `;


    console.log(query)
    db.query(query, (err, row)=>{
        if(err){
            console.log(err);
            res.send(err)
        }else{
            addData(req,res)
        }
    });

   res.send("OK")
    
});

function addData(req,res){
    var data = req.body.form;
    var pb = req.body.pb;
    console.log("DATAAAAAAAAAAAAAAAAA")

    data.forEach((form, index) => {
        console.log(index)
        let insert = `INSERT INTO reg_jp (prodi_id, tahun_id, gelombang_id, pilihan, userId, createdAt)
        VALUES (
            `+form.prodi_id+`,
            `+pb.tahun_id+`,
            `+pb.gelombang_id+`,
            `+(index+1)+`,
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
            }
        })
    });
}


module.exports = router;