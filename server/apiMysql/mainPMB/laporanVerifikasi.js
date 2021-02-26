const express = require('express');
var db = require('../../db/MySql/dbutama');

var kirimEmail = require('../../library/kirimEmail');

const router = express.Router();



router.get('/', (req, res) => {

    console.log(req.body)

    let query = `
        SELECT
        reg_fl.reg_fl_id,

        
        reg_fl.ijazah fl_ijazah,
        reg_fl.transkrip fl_transkrip,
        reg_fl.foto fl_foto,

        reg_dd.reg_dd_id ,
        reg_dd.nama as dd_nama,
        reg_dd.no_ktp as dd_no_ktp,
        reg_dd.tpt_lahir as dd_tpt_lahir,
        reg_dd.tgl_lahir as dd_tgl_lahir,
        reg_dd.hobby as dd_hobby,
        reg_dd.alamat as dd_alamat,
        reg_dd.hp as dd_hp,
        master_agama.uraian as dd_agama,
        master_jenis_kel.singkatan as dd_jenis_kelamin_singkatan,
        master_jenis_kel.uraian as dd_jenis_kelamin_uraian,

        master_provinsi.nama_provinsi as  dd_nama_provinsi,
        master_kabupaten.nama_kabupaten as  dd_nama_kabupaten,
        master_kecamatan.nama_kecamatan as  dd_nama_kecamatan,
        master_des_kel.nama_des_kel as  dd_nama_des_kel,

        reg_as.reg_as_id,
        reg_as.nama_sekolah as as_nama_sekolah,
        reg_as.nis as as_nis,
        reg_as.thn_lulus as as_thn_lulus,
        reg_as.pendidikan_id as as_pendidikan_id,
        reg_as.pendidikan_jurusan_id as as_pendidikan_jurusan_id,
        reg_as.nilai_un as as_nilai_un,

        master_pendidikan_jurusan.uraian as as_pendidikan_jurusan_uraian,




        reg_jp.reg_jp_id,

        jp_master_program.uraian as jp_program_uraian,
        jp_master_prodi.uraian as jp_prodi_uraian,
        jp_master_pendidikan_jurusan.uraian as jp_pendidikan_jurusan_uraian,


        reg_bt.reg_bt_id,
        reg_bt.file as bt_file ,
        reg_bt.nm_pengirim as bt_nm_pengirim ,
        reg_bt.tgl as bt_tgl 


        FROM reg_fl



        LEFT JOIN reg_dd
        ON reg_dd.tahun_id = reg_fl.tahun_id 
        AND reg_dd.userId = reg_fl.userId

        JOIN master_agama
        ON master_agama.agama_id = reg_dd.agama_id


        JOIN master_provinsi
        ON master_provinsi.provinsi_id = reg_dd.provinsi_id

        JOIN master_kabupaten
        ON master_kabupaten.kabupaten_id = reg_dd.kabupaten_id

        JOIN master_kecamatan
        ON master_kecamatan.kecamatan_id = reg_dd.kecamatan_id

        JOIN master_des_kel
        ON master_des_kel.des_kel_id = reg_dd.des_kel_id

        JOIN master_jenis_kel
        ON master_jenis_kel.jenis_kel_id = reg_dd.jenis_kel_id



        LEFT JOIN reg_as
        ON reg_as.tahun_id = reg_fl.tahun_id 
        AND reg_as.userId = reg_fl.userId

        LEFT JOIN master_pendidikan_jurusan
        ON master_pendidikan_jurusan.pendidikan_jurusan_id = reg_as.pendidikan_jurusan_id


        LEFT JOIN reg_jp
        ON reg_jp.tahun_id = reg_fl.tahun_id 
        AND reg_jp.userId = reg_fl.userId

        JOIN master_program jp_master_program
        ON jp_master_program.program_id = reg_jp.program_id

        JOIN master_prodi jp_master_prodi
        ON jp_master_prodi.prodi_id = reg_jp.prodi_id

        JOIN master_pendidikan_jurusan jp_master_pendidikan_jurusan
        ON jp_master_pendidikan_jurusan.pendidikan_jurusan_id = reg_jp.pendidikan_jurusan_id


        JOIN reg_bt
        ON reg_bt.tahun_id = reg_fl.tahun_id 
        AND reg_bt.userId = reg_fl.userId
    
    `
    db.query(query, (err, row)=>{
        var data = [];



        if (err) {
            console.log(err)
            res.json(err)
        }else{


            row.forEach(rowku => {
                var item = data.find(item => item.reg_fl_id === rowku.reg_fl_id);
                if (item == undefined) {
                    data.push({
                        reg_fl_id : rowku.reg_fl_id,
                        fl_ijazah : rowku.fl_ijazah,
                        fl_transkrip : rowku.fl_transkrip,
                        fl_foto : rowku.fl_foto,
                        reg_dd_id : rowku.reg_dd_id,
                        dd_nama : rowku.dd_nama,
                        dd_no_ktp : rowku.dd_no_ktp,
                        dd_tpt_lahir : rowku.dd_tpt_lahir,
                        dd_tgl_lahir : rowku.dd_tgl_lahir,
                        dd_hobby : rowku.dd_hobby,
                        dd_alamat : rowku.dd_alamat,
                        dd_hp : rowku.dd_hp,
                        dd_agama : rowku.dd_agama,
                        dd_jenis_kelamin_singkatan : rowku.dd_jenis_kelamin_singkatan,
                        dd_jenis_kelamin_uraian : rowku.dd_jenis_kelamin_uraian,
                        dd_nama_provinsi : rowku.dd_nama_provinsi,
                        dd_nama_kabupaten : rowku.dd_nama_kabupaten,
                        dd_nama_kecamatan : rowku.dd_nama_kecamatan,
                        dd_nama_des_kel : rowku.dd_nama_des_kel,
                        reg_as_id : rowku.reg_as_id,
                        as_nama_sekolah : rowku.as_nama_sekolah,
                        as_nis : rowku.as_nis,
                        as_thn_lulus : rowku.as_thn_lulus,
                        as_pendidikan_id : rowku.as_pendidikan_id,
                        as_pendidikan_jurusan_id : rowku.as_pendidikan_jurusan_id,
                        as_nilai_un : rowku.as_nilai_un,
                        as_pendidikan_jurusan_uraian : rowku.as_pendidikan_jurusan_uraian,
                        jp : [],
                        bt : []

                    })



                    data.forEach(dataku1 => {

                        row.forEach(rowku1 => {
                            if (dataku1.reg_fl_id == rowku1.reg_fl_id) {
                                var item1 = dataku1.jp.find(item1 => item1.reg_jp_id === rowku1.reg_jp_id);
                                if (item1 == undefined) {
                                    dataku1.jp.push({
                                        reg_jp_id : rowku1.reg_jp_id,
                                        jp_program_uraian : rowku1.jp_program_uraian,
                                        jp_prodi_uraian : rowku1.jp_prodi_uraian,
                                        jp_pendidikan_jurusan_uraian : rowku1.jp_pendidikan_jurusan_uraian,
                                    });
                                }

                                var bt1 = dataku1.bt.find(bt1 => bt1.reg_bt_id === rowku1.reg_bt_id);
                                if (bt1 == undefined) {
                                    dataku1.bt.push({
                                        reg_bt_id : rowku1.reg_bt_id,
                                        bt_file : rowku1.bt_file,
                                        bt_nm_pengirim : rowku1.bt_nm_pengirim,
                                        bt_tgl : rowku1.bt_tgl,
                                    });
                                }
                                
                            }
                        });

                        
                    });
                } 
            });




            
        }

        // res.json(row)
        res.json(data)
    })
});



router.post('/view', (req, res) => {
    console.log(req.body)
    
    var query = `
        SELECT 
        reg_fl.reg_fl_id,
        reg_dd.reg_dd_id ,
        reg_dd.nama as dd_nama,
        reg_dd.no_ktp as dd_no_ktp,
        reg_dd.tpt_lahir as dd_tpt_lahir,
        reg_dd.tgl_lahir as dd_tgl_lahir,
        reg_dd.hobby as dd_hobby,
        reg_dd.alamat as dd_alamat,
        reg_dd.hp as dd_hp,

        master_agama.uraian as dd_agama,

        master_jenis_kel.singkatan as dd_jenis_kelamin_singkatan,
        master_jenis_kel.uraian as dd_jenis_kelamin_uraian,

        master_provinsi.nama_provinsi as  dd_nama_provinsi,
        master_kabupaten.nama_kabupaten as  dd_nama_kabupaten,
        master_kecamatan.nama_kecamatan as  dd_nama_kecamatan,
        master_des_kel.nama_des_kel as  dd_nama_des_kel,

        reg_as.reg_as_id,
        reg_as.nama_sekolah as as_nama_sekolah,
        reg_as.nis as as_nis,
        reg_as.thn_lulus as as_thn_lulus,
        reg_as.pendidikan_id as as_pendidikan_id,
        reg_as.pendidikan_jurusan_id as as_pendidikan_jurusan_id,
        reg_as.nilai_un as as_nilai_un,

        master_pendidikan_jurusan.uraian as as_pendidikan_jurusan_uraian,

        reg_jp.reg_jp_id,

        jp_master_program.uraian as jp_program_uraian,
        jp_master_prodi.uraian as jp_prodi_uraian,


        reg_ot.nm_ayah as ot_nm_ayah,
        reg_ot.nm_ibu as ot_nm_ibu,
        reg_ot.pekerjaan_ayah as ot_pekerjaan_ayah,
        reg_ot.pekerjaan_ibu as ot_pekerjaan_ibu,
        reg_ot.alamat_ot as ot_alamat_ot,
        reg_ot.hp_ot as ot_hp_ot,
        reg_ot.penghasilan as ot_penghasilan,

        (SELECT master_pendidikan.uraian FROM master_pendidikan WHERE master_pendidikan.pendidikan_id = reg_ot.pendidikan_ayah) as ot_pendidikan_ayah,
        (SELECT master_pendidikan.uraian FROM master_pendidikan WHERE master_pendidikan.pendidikan_id = reg_ot.pendidikan_ibu) as ot_pendidikan_ibu

        
        FROM reg_fl

        LEFT JOIN reg_dd
        ON reg_fl.userId = reg_dd.userId AND reg_fl.tahun_id = reg_dd.tahun_id AND reg_fl.gelombang_id = reg_dd.gelombang_id

        JOIN master_agama
        ON master_agama.agama_id = reg_dd.agama_id

        JOIN master_jenis_kel
        ON master_jenis_kel.jenis_kel_id = reg_dd.jenis_kel_id

        JOIN master_provinsi
        ON master_provinsi.provinsi_id = reg_dd.provinsi_id

        JOIN master_kabupaten
        ON master_kabupaten.kabupaten_id = reg_dd.kabupaten_id

        JOIN master_kecamatan
        ON master_kecamatan.kecamatan_id = reg_dd.kecamatan_id

        JOIN master_des_kel
        ON master_des_kel.des_kel_id = reg_dd.des_kel_id

        LEFT JOIN reg_as
        ON reg_as.tahun_id = reg_fl.tahun_id AND reg_as.gelombang_id = reg_fl.gelombang_id AND reg_as.userId = reg_fl.userId

        LEFT JOIN master_pendidikan_jurusan
        ON master_pendidikan_jurusan.pendidikan_jurusan_id = reg_as.pendidikan_jurusan_id

        JOIN reg_jp
        ON reg_fl.userId = reg_jp.userId AND reg_fl.tahun_id = reg_jp.tahun_id AND reg_fl.gelombang_id = reg_jp.gelombang_id

        
        JOIN master_prodi jp_master_prodi
        ON jp_master_prodi.prodi_id = reg_jp.prodi_id

        JOIN master_program jp_master_program
        ON jp_master_program.program_id = jp_master_prodi.program_id

        JOIN reg_ot
        ON reg_ot.tahun_id = reg_fl.tahun_id AND reg_ot.gelombang_id = reg_fl.gelombang_id AND reg_ot.userId = reg_fl.userId
    
        WHERE
        reg_fl.tahun_id = `+req.body.tahun_id+` AND reg_fl.gelombang_id = `+req.body.gelombang_id+` AND reg_fl.stat_pembayaran = 2
    
    `



    db.query(query, (err, row)=>{
        var data = [];
        if(err) {
            console.log(err);
            res.send(err);
        }else{



            row.forEach(rowku => {
                var item = data.find(item => item.reg_fl_id === rowku.reg_fl_id);
                if (item == undefined) {
                    data.push({
                        no_test : '="'+conversi00(rowku.reg_fl_id)+'"',
                        reg_fl_id : rowku.reg_fl_id,
                        fl_skhu : rowku.fl_skhu,
                        fl_ijazah : rowku.fl_ijazah,
                        fl_transkrip : rowku.fl_transkrip,
                        fl_foto : rowku.fl_foto,
                        reg_dd_id : rowku.reg_dd_id,
                        dd_nama : rowku.dd_nama,
                        dd_no_ktp : '="'+rowku.dd_no_ktp+'"',
                        dd_tpt_lahir : rowku.dd_tpt_lahir,
                        dd_tgl_lahir : rowku.dd_tgl_lahir,
                        dd_hobby : rowku.dd_hobby,
                        dd_alamat : rowku.dd_alamat,
                        dd_hp : '="'+rowku.dd_hp+'"',
                        dd_agama : rowku.dd_agama,
                        dd_jenis_kelamin_singkatan : rowku.dd_jenis_kelamin_singkatan,
                        dd_jenis_kelamin_uraian : rowku.dd_jenis_kelamin_uraian,
                        dd_nama_provinsi : rowku.dd_nama_provinsi,
                        dd_nama_kabupaten : rowku.dd_nama_kabupaten,
                        dd_nama_kecamatan : rowku.dd_nama_kecamatan,
                        dd_nama_des_kel : rowku.dd_nama_des_kel,
                        reg_as_id : rowku.reg_as_id,
                        as_nama_sekolah : rowku.as_nama_sekolah,
                        as_nis : '="'+rowku.as_nis+'"',
                        as_thn_lulus : rowku.as_thn_lulus,
                        as_pendidikan_id : rowku.as_pendidikan_id,
                        as_pendidikan_jurusan_id : rowku.as_pendidikan_jurusan_id,
                        as_nilai_un : rowku.as_nilai_un,
                        as_pendidikan_jurusan_uraian : rowku.as_pendidikan_jurusan_uraian,

                        ot_nm_ayah : rowku.ot_nm_ayah,
                        ot_nm_ibu : rowku.ot_nm_ibu,
                        ot_pendidikan_ayah : rowku.ot_pendidikan_ayah,
                        ot_pendidikan_ibu : rowku.ot_pendidikan_ibu,
                        ot_pekerjaan_ayah : rowku.ot_pekerjaan_ayah,
                        ot_pekerjaan_ibu : rowku.ot_pekerjaan_ibu,
                        ot_alamat_ot : rowku.ot_alamat_ot,
                        ot_hp_ot : '="'+rowku.ot_hp_ot+'"',
                        ot_penghasilan : rowku.ot_penghasilan,






                        jp : [],
                    })



                    data.forEach(dataku1 => {

                        row.forEach(rowku1 => {
                            if (dataku1.reg_fl_id == rowku1.reg_fl_id) {
                                var item1 = dataku1.jp.find(item1 => item1.reg_jp_id === rowku1.reg_jp_id);
                                if (item1 == undefined) {
                                    dataku1.jp.push({
                                        reg_jp_id : rowku1.reg_jp_id,
                                        jp_program_uraian : rowku1.jp_program_uraian,
                                        jp_prodi_uraian : rowku1.jp_prodi_uraian,
                                        jp_pendidikan_jurusan_uraian : rowku1.jp_pendidikan_jurusan_uraian,
                                    });
                                }

                              
                                
                            }
                        });

                        
                    });
                } 
            });
























            res.send(data);

        }
    })
    
    
    
});


function conversi00 (params) {
    var data = String(params)
    return ('000' + data).slice(-4)

    // return params
}




module.exports = router;