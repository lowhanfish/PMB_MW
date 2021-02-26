const express = require('express');
var db = require('../../db/MySql/dbutama');

const fs = require('fs');

var multer = require("multer");
var upload = require('../../db/multer/pdf');

var uniqid = require('uniqid');
const router = express.Router();



router.post('/registrator', (req, res) => {
    var tahun_id = req.body.tahun_id;
    var gelombang_id = req.body.gelombang_id;

    // console.log(req.body)

    let query = `
        SELECT
        COUNT (reg_fl.reg_fl_id) as pendaftar,
        (SELECT 
            COUNT (IFNULL(reg_fl.reg_fl_id, 0)) 
            FROM reg_fl
            WHERE reg_fl.gelombang_id = `+ gelombang_id + ` AND reg_fl.tahun_id = ` + tahun_id + ` AND reg_fl.stat_pembayaran = 1
        ) as proses,

        (SELECT 
            COUNT (IFNULL(reg_fl.reg_fl_id, 0)) 
            FROM reg_fl
            WHERE reg_fl.gelombang_id = `+ gelombang_id + ` AND reg_fl.tahun_id = ` + tahun_id + ` AND reg_fl.stat_pembayaran = 2
        ) as diterima,

        (SELECT 
            COUNT (IFNULL(reg_fl.reg_fl_id, 0)) 
            FROM reg_fl
            WHERE reg_fl.gelombang_id = `+ gelombang_id + ` AND reg_fl.tahun_id = ` + tahun_id + ` AND reg_fl.stat_pembayaran = 3
        ) as dikembalikan

        FROM reg_fl

        WHERE reg_fl.gelombang_id = `+ gelombang_id + ` AND reg_fl.tahun_id = ` + tahun_id + ` AND reg_fl.stat_pembayaran != 0

    `
    db.query(query, (err, row) => {
        if (err) {
            res.json(err)
        } else {
            res.json(row[0])
        }
    })

});




router.post('/JK', (req, res) => {
    var tahun_id = req.body.tahun_id;
    var gelombang_id = req.body.gelombang_id;

    // console.log(req.body)

    let query = `
        SELECT 
        master_jenis_kel.uraian as name,

        COUNT(reg_dd.reg_dd_id) as y

        FROM master_jenis_kel

        LEFT JOIN reg_dd
        ON master_jenis_kel.jenis_kel_id = reg_dd.jenis_kel_id

        JOIN reg_fl
        ON reg_dd.tahun_id = reg_fl.tahun_id AND reg_dd.gelombang_id = reg_fl.gelombang_id

        WHERE reg_dd.gelombang_id = `+ gelombang_id + ` AND reg_dd.tahun_id = ` + tahun_id + ` AND reg_fl.stat_pembayaran != 0

        GROUP BY master_jenis_kel.uraian;

    `
    db.query(query, (err, row) => {
        if (err) {
            res.json(err)
        } else {
            res.json(row)
        }
    })

});



router.post('/pendapatanOrangTua', (req, res) => {
    var tahun_id = req.body.tahun_id;
    var gelombang_id = req.body.gelombang_id;

    let query = `
        SELECT
        (SELECT COUNT (penghasilan) FROM reg_ot WHERE penghasilan <= 2000000) as bwh_dua,
        (SELECT COUNT (penghasilan) FROM reg_ot WHERE penghasilan > 2000000 AND penghasilan <= 5000000) as dua_lima,
        (SELECT COUNT (penghasilan) FROM reg_ot WHERE penghasilan > 5000000 AND penghasilan <= 10000000) as lima_sepuluh,
        (SELECT COUNT (penghasilan) FROM reg_ot WHERE penghasilan > 10000000 AND penghasilan <= 15000000) as sepuluh_limabelas,
        (SELECT COUNT (penghasilan) FROM reg_ot WHERE penghasilan > 15000000) as ats_limabelas

        FROM  reg_ot

        JOIN reg_fl
        ON reg_ot.tahun_id = reg_fl.tahun_id AND reg_ot.gelombang_id = reg_fl.gelombang_id

        WHERE reg_ot.gelombang_id = `+ gelombang_id + ` AND reg_ot.tahun_id = ` + tahun_id + ` AND reg_fl.stat_pembayaran != 0

       
    `
    db.query(query, (err, row) => {
        if (err) {
            res.json(err)
        } else {

            var rowku = row[0]

            var categories = [
                '< 2 Jt',
                '> 2-5 Jt',
                '> 5-10 Jt',
                '> 10-15 Jt',
                '> 15 Jt',
            ]


            var data = [
                rowku.bwh_dua,
                rowku.dua_lima,
                rowku.lima_sepuluh,
                rowku.sepuluh_limabelas,
                rowku.ats_limabelas
            ]






            res.json({
                categories: categories,
                data: data,
            })
        }
    })
});


router.post('/j_jenis_kelamin', (req, res) => {
    var tahun_id = req.body.tahun_id;
    var gelombang_id = req.body.gelombang_id;

    let query = `
        SELECT 
        CONCAT(master_program.singkatan,'-',master_prodi.uraian) as uraian,
        (
            SELECT COUNT (reg_jp.prodi_id) 
            FROM reg_jp

            JOIN reg_dd
            ON reg_dd.tahun_id = reg_jp.tahun_id AND reg_dd.gelombang_id = reg_jp.gelombang_id AND reg_dd.userId = reg_jp.userId

            JOIN reg_fl
            ON reg_dd.tahun_id = reg_fl.tahun_id AND reg_dd.gelombang_id = reg_fl.gelombang_id  AND reg_dd.userId = reg_fl.userId

            WHERE 
            reg_jp.prodi_id = master_prodi.prodi_id AND reg_dd.jenis_kel_id = 1 AND reg_jp.pilihan = 1 AND
            (reg_fl.gelombang_id = `+ gelombang_id + ` AND reg_fl.tahun_id = ` + tahun_id + ` AND reg_fl.stat_pembayaran != 0)

        ) as M1,

        (
            SELECT COUNT (reg_jp.prodi_id) 
            FROM reg_jp

            JOIN reg_dd
            ON reg_dd.tahun_id = reg_jp.tahun_id AND reg_dd.gelombang_id = reg_jp.gelombang_id AND reg_dd.userId = reg_jp.userId

            JOIN reg_fl
            ON reg_dd.tahun_id = reg_fl.tahun_id AND reg_dd.gelombang_id = reg_fl.gelombang_id  AND reg_dd.userId = reg_fl.userId

            WHERE 
            reg_jp.prodi_id = master_prodi.prodi_id AND reg_dd.jenis_kel_id = 1 AND reg_jp.pilihan = 2 AND
            (reg_fl.gelombang_id = `+ gelombang_id + ` AND reg_fl.tahun_id = ` + tahun_id + ` AND reg_fl.stat_pembayaran != 0)

        ) as M2,

        (
            SELECT COUNT (reg_jp.prodi_id) 
            FROM reg_jp

            JOIN reg_dd
            ON reg_dd.tahun_id = reg_jp.tahun_id AND reg_dd.gelombang_id = reg_jp.gelombang_id AND reg_dd.userId = reg_jp.userId

            JOIN reg_fl
            ON reg_dd.tahun_id = reg_fl.tahun_id AND reg_dd.gelombang_id = reg_fl.gelombang_id  AND reg_dd.userId = reg_fl.userId

            WHERE 
            reg_jp.prodi_id = master_prodi.prodi_id AND reg_dd.jenis_kel_id = 2 AND reg_jp.pilihan = 1 AND
            (reg_fl.gelombang_id = `+ gelombang_id + ` AND reg_fl.tahun_id = ` + tahun_id + ` AND reg_fl.stat_pembayaran != 0)

        ) as F1,
        (
            SELECT COUNT (reg_jp.prodi_id) 
            FROM reg_jp

            JOIN reg_dd
            ON reg_dd.tahun_id = reg_jp.tahun_id AND reg_dd.gelombang_id = reg_jp.gelombang_id AND reg_dd.userId = reg_jp.userId

            JOIN reg_fl
            ON reg_dd.tahun_id = reg_fl.tahun_id AND reg_dd.gelombang_id = reg_fl.gelombang_id  AND reg_dd.userId = reg_fl.userId

            WHERE 
            reg_jp.prodi_id = master_prodi.prodi_id AND reg_dd.jenis_kel_id = 2 AND reg_jp.pilihan = 2 AND
            (reg_fl.gelombang_id = `+ gelombang_id + ` AND reg_fl.tahun_id = ` + tahun_id + ` AND reg_fl.stat_pembayaran != 0)

        ) as F2

       
        FROM master_prodi

        JOIN master_program
        ON master_program.program_id = master_prodi.program_id


        ORDER BY master_program.program_id


    `
    db.query(query, (err, row) => {
        if (err) {
            res.json(err)
        } else {




            var categories = []
            var M1 = []
            var M2 = []
            var F1 = []
            var F2 = []


            row.forEach(eL1 => {
                categories.push(eL1.uraian);
                M1.push(eL1.M1)
                M2.push(eL1.M2)
                F1.push(eL1.F1)
                F2.push(eL1.F2)
            });




            res.json({
                categories : categories,
                M1 : M1,
                M2 : M2,
                F1 : F1,
                F2 : F2,
            })
        }
    })

});




router.post('/j_minat_jurusan', (req, res) => {
    var tahun_id = req.body.tahun_id;
    var gelombang_id = req.body.gelombang_id;

    // console.log(req.body)

    let query = `
        SELECT 
        CONCAT(master_program.singkatan,'-',master_prodi.uraian) as name,
        (
            SELECT COUNT (reg_jp.prodi_id) 
            FROM reg_jp

            JOIN reg_fl
            ON reg_jp.tahun_id = reg_fl.tahun_id AND reg_jp.gelombang_id = reg_fl.gelombang_id  AND reg_jp.userId = reg_fl.userId

            WHERE 
            reg_jp.prodi_id = master_prodi.prodi_id AND
            (reg_fl.gelombang_id = `+ gelombang_id + ` AND reg_fl.tahun_id = ` + tahun_id + ` AND reg_fl.stat_pembayaran != 0)

        ) as y
    
        FROM master_prodi

        JOIN master_program
        ON master_program.program_id = master_prodi.program_id


        ORDER BY master_program.program_id


    `
    db.query(query, (err, row) => {
        if (err) {
            res.json(err)
        } else {
            res.json(row)
        }
    })

});


router.post('/j_minat_daerah', (req, res) => {
    var tahun_id = req.body.tahun_id;
    var gelombang_id = req.body.gelombang_id;

    let query = `
        SELECT 
        master_kabupaten.nama_kabupaten as uraian,
        (
            SELECT COUNT (reg_dd.reg_dd_id) 
            FROM reg_dd

            JOIN reg_fl
            ON reg_dd.tahun_id = reg_fl.tahun_id AND reg_dd.gelombang_id = reg_fl.gelombang_id  AND reg_dd.userId = reg_fl.userId

            WHERE 

            reg_dd.kabupaten_id = master_kabupaten.kabupaten_id AND
            (reg_fl.gelombang_id = `+ gelombang_id + ` AND reg_fl.tahun_id = ` + tahun_id + ` AND reg_fl.stat_pembayaran != 0)

        ) as data


        FROM master_kabupaten

        WHERE master_kabupaten.provinsi_id = 74


    `
    db.query(query, (err, row) => {
        if (err) {
            res.json(err)
        } else {




            var categories = []
            var data = []

            row.forEach(eL1 => {
                categories.push(eL1.uraian);
                data.push(eL1.data)
            });




            res.json({
                categories : categories,
                data : data,
            })
        }
    })

});


module.exports = router;