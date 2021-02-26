const express = require('express');
var db = require('../../db/MySql/dbutama');

var kirimEmail = require('../../library/kirimEmail');

const router = express.Router();


router.post('/view', (req, res) => {
    var data_batas = req.body.page_limit;
    var data_star = (req.body.data_ke - 1)* data_batas;
    var cari = req.body.cari_value;
    var halaman = 1;

    let jml_data = `
        SELECT
        syk_dokpersiapan.*
        FROM syk_dokpersiapan
        WHERE
        (syk_dokpersiapan.tahun_id = `+req.body.tahun_id+`) AND
        syk_dokpersiapan.uraian LIKE '%`+cari+`%'
    `

    let view = `
        SELECT
        syk_dokpersiapan.*
        FROM syk_dokpersiapan
        WHERE
        (syk_dokpersiapan.tahun_id = `+req.body.tahun_id+`) AND
        syk_dokpersiapan.uraian LIKE '%`+cari+`%'

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
     let insert = `INSERT INTO syk_dokpersiapan (uraian, tahun_id)
    VALUES (
        '`+req.body.uraian+`' ,
        `+req.body.tahun_id+`
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
    UPDATE syk_dokpersiapan SET
    uraian = '`+req.body.uraian+`'
    WHERE dokPersiapan_id = `+req.body.dokPersiapan_id+`
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
        DELETE FROM syk_dokpersiapan WHERE dokPersiapan_id = `+req.body.dokPersiapan_id+`;
    `;
    db.query(query, (err, row)=>{
        if(err){
            res.send(err);
        }else{
            res.send(row);
        }
    });
})



module.exports = router;