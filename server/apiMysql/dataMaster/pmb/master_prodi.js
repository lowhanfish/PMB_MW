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
        master_prodi.*
        FROM master_prodi
       
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

    let query = `
        SELECT
        master_prodi.*
        FROM master_prodi
        
        WHERE master_prodi.program_id = `+req.body.program_id+`
       
    `
    db.query(query, (err, row)=>{
        if (err) {
            res.json(err)
        }else{
            res.json(row)
        }
    })
});

router.post('/bySelect', (req, res) => {
    console.log(req.body)
    let query = `
        SELECT
        master_prodi.*,
        master_program.uraian as program_uraian,
        master_program.singkatan as program_singkatan

        FROM master_prodi

        LEFT JOIN master_program
        ON master_prodi.program_id = master_program.program_id

        
        WHERE
        NOT EXISTS (
            SELECT 
            setting_gelombang_pendaftaran.prodi_id 
            FROM   setting_gelombang_pendaftaran 

            WHERE  
            setting_gelombang_pendaftaran.prodi_id = master_prodi.prodi_id AND
            setting_gelombang_pendaftaran.tahun_id = `+req.body.tahun_id+` AND
            setting_gelombang_pendaftaran.gelombang_id = `+req.body.gelombang_id+`
            
        )

        ORDER BY master_program.program_id
       
    `
    db.query(query, (err, row)=>{
        if (err) {
            console.log(err)
            res.json(err)
        }else{
            res.json(row)
        }
    })
});




router.post('/view', (req, res) => {
    var data_batas = parseInt(req.body.page_limit);
    var data_star = (req.body.data_ke - 1)* data_batas;
    var cari = req.body.cari_value;
    var halaman = 1;

    // FILTER FAKULTAS
    var filterFakultas = ''
    if (req.body.fakultas_id == '' || req.body.fakultas_id == null || req.body.fakultas_id == undefined  ) {
        filterFakultas = ''
        console.log('tidak ada')
    } else{
        filterFakultas = ` AND master_prodi.fakultas_id = `+req.body.fakultas_id+``
    }


    // FILTER FAKULTAS

    console.log(req.body)

    let jml_data = `
        SELECT
        master_prodi.*,
        master_program.uraian as program_uraian
        FROM master_prodi
        
        LEFT JOIN master_program
        ON master_prodi.program_id = master_program.program_id
        
        WHERE 
        master_prodi.uraian LIKE '%`+cari+`%' 
        `+filterFakultas+`

    `

    let view = `
        SELECT
        master_prodi.*,
        master_program.uraian as program_uraian,
        master_fakultas.uraian as fakultas_uraian
        FROM master_prodi

        LEFT JOIN master_program
        ON master_prodi.program_id = master_program.program_id

        LEFT JOIN master_fakultas
        ON master_prodi.fakultas_id = master_fakultas.id

        WHERE 
        master_prodi.uraian LIKE '%`+cari+`%'
        `+filterFakultas+`

        ORDER BY master_prodi.fakultas_id, master_prodi.program_id

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
router.post('/addData', (req,res)=>{
     let insert = `INSERT INTO master_prodi (uraian, program_id, fakultas_id)
    VALUES (
        '`+req.body.uraian+`',
        `+req.body.program_id+`,
        `+req.body.fakultas_id+`
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

// UPDATE `master_prodi` SET `uraian` = 'aaaaaa' WHERE `master_prodi`.`prodi_id` = 1;

router.post('/editData',(req,res)=>{
    query = `
    UPDATE master_prodi SET
    uraian = '`+req.body.uraian+`',
    program_id = `+req.body.program_id+`,
    fakultas_id = `+req.body.fakultas_id+`

    WHERE prodi_id = '`+req.body.prodi_id+`'
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

    var query = `
        DELETE FROM master_prodi WHERE prodi_id = `+req.body.prodi_id+`;
    `;
    db.query(query, (err, row)=>{
        if(err){
            res.send(err);
        }else{
            res.send(row);
        }
    });
})




// ==================================================== RELASI PRODI JURUSAN ===================================================

    router.post('/addDatajurusan', (req, res)=> {

        var data = req.body;
        var datax = data.pendidikan_jurusan_id
        var data_length = datax.length

        for (let i = 0; i < data_length; i++) {
            
            var query = `
                INSERT INTO master_relasi_prodi_jurusan 
                (pendidikan_jurusan_id, prodi_id) VALUES
                (`+datax[i].pendidikan_jurusan_id+`, `+req.body.prodi_id+`)
            `;

            db.query(query, (err, row)=>{
                if(err){
                    console.log(err)
                }
            });
            
        }
        
        res.send('oke');

        // hapus_file(file);

        
    })


    router.post('/getRelasi', (req, res) => {
        var data_batas = req.body.page_limit;
        var data_star = (req.body.data_ke - 1)* data_batas;
        var cari = req.body.cari_value;
        var halaman = 1;

        var pendidikan_id = req.body.pendidikan_id
        // console.log(req.body)

        if (pendidikan_id == null || pendidikan_id==undefined || pendidikan_id == '' || pendidikan_id == ' ' || pendidikan_id == '-') {
            query_filter = ''
        }else{
            query_filter = "AND master_pendidikan.pendidikan_id = "+pendidikan_id+""
        }
    
        let jml_data = `
            SELECT 
            master_relasi_prodi_jurusan.*,
            master_pendidikan_jurusan.uraian,
            master_pendidikan.pendidikan_id

            FROM master_relasi_prodi_jurusan

            LEFT JOIN master_pendidikan_jurusan
            ON master_pendidikan_jurusan.pendidikan_jurusan_id = master_relasi_prodi_jurusan.pendidikan_jurusan_id

            LEFT JOIN master_pendidikan
            ON master_pendidikan.pendidikan_id = master_pendidikan_jurusan.pendidikan_id

            WHERE 
            master_pendidikan_jurusan.uraian LIKE '%`+cari+`%' 
            AND master_relasi_prodi_jurusan.prodi_id = `+req.body.prodi_id+`

            `+query_filter+`
    
        `
    
        let view = `
            SELECT 
            master_relasi_prodi_jurusan.*,
            master_pendidikan_jurusan.uraian as pendidikan_jurusan_uraian,
            master_pendidikan.pendidikan_id,
            master_pendidikan.uraian as pendidikan_uraian

            FROM master_relasi_prodi_jurusan

            LEFT JOIN master_pendidikan_jurusan
            ON master_pendidikan_jurusan.pendidikan_jurusan_id = master_relasi_prodi_jurusan.pendidikan_jurusan_id

            LEFT JOIN master_pendidikan
            ON master_pendidikan.pendidikan_id = master_pendidikan_jurusan.pendidikan_id

            WHERE 
            master_pendidikan_jurusan.uraian LIKE '%`+cari+`%' 
            AND master_relasi_prodi_jurusan.prodi_id = `+req.body.prodi_id+`
            `+query_filter+`
    
            LIMIT `+data_star+`,`+data_batas+`
        `
        db.query(jml_data, (err, row)=>{
            if (err) {
                console.log('error di jm data')
                console.log(err)
                res.json(err)
            }else{
                halaman = Math.ceil(row.length/data_batas);
                if(halaman<1){halaman = 1}
                // ========================
                db.query(view, (err1, result)=>{
                    if (err) {
                        console.log('error di result')
                        console.log(err1)
                        res.json(err1)
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



    router.post('/getRelasiPeminatan', (req, res) => {

        console.log(req.body)
        // master_relasi_prodi_jurusan.*,
        
        let view = `
            SELECT 
            master_prodi.prodi_id as prodi_id,
            master_prodi.uraian as master_prodi_uraian,
            master_program.program_id,
            master_program.uraian as program_uraian,
            master_program.singkatan as program_singkatan,
            master_fakultas.uraian as fakultas_uraian

            FROM master_relasi_prodi_jurusan
            
            JOIN master_prodi
            ON master_prodi.prodi_id = master_relasi_prodi_jurusan.prodi_id

            JOIN master_program
            ON master_program.program_id = master_prodi.program_id

            JOIN master_fakultas
            ON master_fakultas.id = master_prodi.fakultas_id


            WHERE 
            master_relasi_prodi_jurusan.pendidikan_jurusan_id = `+req.body.pendidikan_jurusan_id+`
            
            `
            // AND master_relasi_prodi_jurusan.prodi_id = `+req.body.prodi_id+`
        db.query(view, (err, row)=>{
            if(err){
                console.log(err)
                res.send(err);
            }else{
                res.send(row);
            }
        })
        // ========================
    });

    router.post('/removeDataRelasi', (req, res)=> {
  
        var query = `
            DELETE FROM master_relasi_prodi_jurusan WHERE relasi_prodi_jurusan_id = `+req.body.id+`;
        `;
        db.query(query, (err, row)=>{
            if(err){
                res.send(err);
            }else{
                res.send(row);
            }
        });
    })
    


// ==================================================== END RELASI PRODI JURUSAN ===================================================

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