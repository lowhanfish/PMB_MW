const express = require('express');
var db = require('../../db/MySql/dbutama');

var kirimEmail = require('../../library/kirimEmail');

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
        reg_fl.reg_fl_id,
        master_jenis_kel.uraian as master_jenis_kel_uraian,
        users.email
        
        FROM reg_dd

        JOIN master_jenis_kel
        ON master_jenis_kel.jenis_kel_id = reg_dd.jenis_kel_id

        JOIN reg_fl
        ON reg_fl.tahun_id = `+req.body.tahun_id+` AND reg_fl.gelombang_id = `+req.body.gelombang_id+` AND reg_fl.userId = reg_dd.userId

        JOIN users
        ON users.id = reg_dd.userId

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
    var users = req.body.userId

    query = `
        SELECT 
        reg_dd.*,
        master_jenis_kel.uraian as master_jenis_kel_uraian,
        master_agama.uraian as master_agama_uraian,
        master_kabupaten.nama_kabupaten as master_kabupaten_uraian,
        master_provinsi.nama_provinsi as master_provinsi_uraian,
        reg_as.pendidikan_id,
        reg_as.nama_sekolah,
        reg_as.nis,
        reg_as.thn_lulus,
        reg_as.nilai_un,
        master_pendidikan_jurusan.uraian as master_pendidikan_jurusan_uraian,

        reg_ot.nm_ayah,
        reg_ot.nm_ibu,
        reg_ot.pekerjaan_ayah,
        reg_ot.pekerjaan_ibu,
        reg_ot.alamat_ot,
        reg_ot.hp_ot,
        reg_ot.penghasilan,
        master_kabupaten_ot.nama_kabupaten as master_kabupaten_ot_uraian,
        master_provinsi_ot.nama_provinsi as master_provinsi_ot_uraian,
        master_pendidikan_ayah.uraian as master_pendidikan_ayah_uraian,
        master_pendidikan_ibu.uraian as master_pendidikan_ibu_uraian,

        reg_fl.foto,
        reg_fl.ijazah,
        reg_fl.transkrip,
        reg_fl.bukti_transfer,
        reg_fl.keterangan,
        reg_fl.createdAt as tgl_kirim




        FROM reg_dd

        JOIN master_jenis_kel
        ON master_jenis_kel.jenis_kel_id = reg_dd.jenis_kel_id

        JOIN master_agama
        ON master_agama.agama_id = reg_dd.agama_id

        JOIN master_kabupaten
        ON master_kabupaten.kabupaten_id = reg_dd.kabupaten_id

        JOIN master_provinsi
        ON master_provinsi.provinsi_id = reg_dd.provinsi_id

        JOIN reg_as
        ON reg_as.tahun_id = `+req.body.tahun_id+` AND reg_as.gelombang_id = `+req.body.gelombang_id+` AND reg_as.userId = reg_dd.userId

        JOIN master_pendidikan_jurusan
        ON master_pendidikan_jurusan.pendidikan_jurusan_id = reg_as.pendidikan_jurusan_id
        
        JOIN reg_ot
        ON reg_ot.tahun_id = `+req.body.tahun_id+` AND reg_ot.gelombang_id = `+req.body.gelombang_id+` AND reg_ot.userId = reg_dd.userId

        JOIN master_pendidikan master_pendidikan_ayah
        ON master_pendidikan_ayah.pendidikan_id = reg_ot.pendidikan_ayah

        JOIN master_pendidikan master_pendidikan_ibu
        ON master_pendidikan_ibu.pendidikan_id = reg_ot.pendidikan_ibu

        JOIN master_kabupaten master_kabupaten_ot
        ON master_kabupaten_ot.kabupaten_id = reg_ot.kabupaten_id

        JOIN master_provinsi master_provinsi_ot
        ON master_provinsi_ot.provinsi_id = reg_ot.provinsi_id

        JOIN reg_fl
        ON reg_fl.tahun_id = `+req.body.tahun_id+` AND reg_fl.gelombang_id = `+req.body.gelombang_id+` AND reg_fl.userId = reg_dd.userId


        WHERE
        reg_dd.tahun_id = `+req.body.tahun_id+` AND reg_dd.gelombang_id = `+req.body.gelombang_id+` AND reg_dd.userId = '`+users+`'
    `;
    db.query(query, (err, row)=>{
        if(err) {
            console.log(err);
            res.send(err);
        }else{




            viewJurusan = `
                SELECT 
                reg_jp.pilihan,
                master_prodi.uraian as program_studi,
                master_program.singkatan as program,
                master_fakultas.uraian as fakultas
                
                FROM reg_jp

                JOIN master_prodi
                ON reg_jp.prodi_id = master_prodi.prodi_id

                JOIN master_program
                ON master_prodi.program_id = master_program.program_id

                JOIN master_fakultas
                ON master_prodi.fakultas_id = master_fakultas.id
                
                WHERE
                reg_jp.tahun_id = `+req.body.tahun_id+` AND reg_jp.gelombang_id = `+req.body.gelombang_id+` AND reg_jp.userId = '`+users+`'
            `;
            db.query(viewJurusan, (err1, row1)=>{
                if(err) {
                    console.log(err1);
                    res.send(err1);
                }else{
                    res.send({
                        data : row,
                        jp : row1
                    });
                }
            })




           
        }
    })

});


router.post('/kembalikanData', (req,res)=>{

    if (req.body.stat_pembayaran == 2) {
        var ket = 'Tahapan pendaftaran anda telah selesai, silahkan menunggu jadwal selanjutnya'
    } else {
        var ket = req.body.keterangan
    }


    // console.log(req.body);



    query = `
        UPDATE reg_fl SET
        stat_pembayaran = `+req.body.stat_pembayaran+`,
        keterangan = '`+ket+`'

        WHERE reg_fl_id = `+req.body.reg_fl_id+`
    `;
    db.query(query, (err, row)=>{
        if(err) {
            console.log(err);
            res.send(err);
        }else{
            kirimEmail.emailHTML(req.body.email, req.body.stat_pembayaran, ket, req.body.gelombang_id, req.body.tahun_id, req.body.userId)
            res.send(row);
        }
    })

    // console.log(req.body)
    // res.send('OK')
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