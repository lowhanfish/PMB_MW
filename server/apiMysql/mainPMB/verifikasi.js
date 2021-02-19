const express = require('express');
var db = require('../../db/MySql/dbutama');

const fs = require('fs');

var multer=require("multer");
var upload = require('../../db/multer/pdf');

var uniqid = require('uniqid');
const router = express.Router();



router.post('/view', (req, res) => {
    var data_batas = 8;
    var data_star = (req.body.data_ke - 1)* data_batas;
    var cari = req.body.cari_value;
    var halaman = 1;

    var filterProdi = '';
    var joinProdi = '';

    if (req.body.prodi_id == '' || req.body.prodi_id == null || req.body.prodi_id == undefined) {
        filterProdi = '';
        joinProdi = '';

    } else {
        filterProdi = `reg_jp.prodi_id = `+req.body.prodi_id+` AND`;
        joinProdi = `
            JOIN reg_jp
            ON reg_jp.tahun_id = `+req.body.tahun_id+` AND reg_jp.gelombang_id = `+req.body.gelombang_id+` AND reg_jp.userId = reg_dd.userId
        `;
    }



    let jml_data = `
        SELECT
        reg_dd.*
        FROM reg_dd
        JOIN reg_fl
        ON reg_fl.tahun_id = `+req.body.tahun_id+` AND reg_fl.gelombang_id = `+req.body.gelombang_id+` AND reg_fl.userId = reg_dd.userId
        `+joinProdi+`
        WHERE
        reg_dd.tahun_id = `+req.body.tahun_id+` AND
        reg_dd.gelombang_id = `+req.body.gelombang_id+` AND
        `+filterProdi+`
        reg_fl.stat_pembayaran = `+req.body.status+` AND
        reg_dd.nama LIKE '%`+cari+`%'
    `

    let view = `
        SELECT
        reg_dd.*,
        master_jenis_kel.uraian as master_jenis_kel_uraian
        
        FROM reg_dd

        JOIN master_jenis_kel
        ON master_jenis_kel.jenis_kel_id = reg_dd.jenis_kel_id

        JOIN reg_fl
        ON reg_fl.tahun_id = `+req.body.tahun_id+` AND reg_fl.gelombang_id = `+req.body.gelombang_id+` AND reg_fl.userId = reg_dd.userId

        `+joinProdi+`

        WHERE
        reg_dd.tahun_id = `+req.body.tahun_id+` AND
        reg_dd.gelombang_id = `+req.body.gelombang_id+` AND
        `+filterProdi+`
        reg_fl.stat_pembayaran = `+req.body.status+` AND
        reg_dd.nama LIKE '%`+cari+`%'


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
            db.query(view, (err1, result)=>{
                if (err1) {
                    console.log(err1)
                    res.json(err)
                }
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


router.post('/getOne', (req,res)=>{

    query = `
        SELECT 
        reg_dd.*,
        master_jenis_kel.uraian as master_jenis_kel_uraian

        FROM reg_dd

        JOIN master_jenis_kel
        ON master_jenis_kel.jenis_kel_id = reg_dd.jenis_kel_id

        WHERE
        reg_dd.tahun_id = `+req.body.tahun_id+` AND reg_dd.gelombang_id = `+req.body.gelombang_id+` AND reg_dd.userId = '`+req.body.userId+`'
    `;
    db.query(query, (err, row)=>{
        if(err) {
            console.log(err);
            res.send(err);
        }else{
            res.send(row);
        }
    })

});

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