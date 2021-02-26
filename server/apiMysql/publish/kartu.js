const express = require('express');

var html_to_pdf = require('html-pdf-node');
var db = require('../../db/MySql/dbutama');
const fs = require('fs');
const path = require('path');
var config = require('../../configuration/config');

var urlServer = config.alamatServer;

const router = express.Router();

router.get('/', (req, res) => {

    var users = req.query.userId

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
        ON reg_as.tahun_id = `+req.query.tahun_id+` AND reg_as.gelombang_id = `+req.query.gelombang_id+` AND reg_as.userId = reg_dd.userId

        JOIN master_pendidikan_jurusan
        ON master_pendidikan_jurusan.pendidikan_jurusan_id = reg_as.pendidikan_jurusan_id
        
        JOIN reg_ot
        ON reg_ot.tahun_id = `+req.query.tahun_id+` AND reg_ot.gelombang_id = `+req.query.gelombang_id+` AND reg_ot.userId = reg_dd.userId

        JOIN master_pendidikan master_pendidikan_ayah
        ON master_pendidikan_ayah.pendidikan_id = reg_ot.pendidikan_ayah

        JOIN master_pendidikan master_pendidikan_ibu
        ON master_pendidikan_ibu.pendidikan_id = reg_ot.pendidikan_ibu

        JOIN master_kabupaten master_kabupaten_ot
        ON master_kabupaten_ot.kabupaten_id = reg_ot.kabupaten_id

        JOIN master_provinsi master_provinsi_ot
        ON master_provinsi_ot.provinsi_id = reg_ot.provinsi_id

        JOIN reg_fl
        ON reg_fl.tahun_id = `+req.query.tahun_id+` AND reg_fl.gelombang_id = `+req.query.gelombang_id+` AND reg_fl.userId = reg_dd.userId


        WHERE
        reg_dd.tahun_id = `+req.query.tahun_id+` AND reg_dd.gelombang_id = `+req.query.gelombang_id+` AND reg_dd.userId = '`+users+`'
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
                reg_jp.tahun_id = `+req.query.tahun_id+` AND reg_jp.gelombang_id = `+req.query.gelombang_id+` AND reg_jp.userId = '`+users+`'
            `;
            db.query(viewJurusan, (err1, row1)=>{
                if(err) {
                    console.log(err1);
                    res.send(err1);
                }else{
                    // res.send({
                    //     data : row,
                    //     jp : row1
                    // });


                    res.render("formulir", {
                        data : row[0],
                        jp : row1,
                        URLX : urlServer,


                        convertDate : (tgl)=>{
                            var date = new Date(tgl);
                            var getBulan = date.getMonth() + 1; var bulan = '';
                            if (getBulan == '1') {bulan = 'Jan'}
                            else if(getBulan == '2') {bulan = 'Februari'}
                            else if(getBulan == '3') {bulan = 'Maret'}
                            else if(getBulan == '4') {bulan = 'April'}
                            else if(getBulan == '5') {bulan = 'Mei'}
                            else if(getBulan == '6') {bulan = 'Juni'}
                            else if(getBulan == '7') {bulan = 'Juli'}
                            else if(getBulan == '8') {bulan = 'Agustus'}
                            else if(getBulan == '9') {bulan = 'September'}
                            else if(getBulan == '10') {bulan = 'Oktober'}
                            else if(getBulan == '11') {bulan = 'November'}
                            else if(getBulan == '12') {bulan = 'Desember'}
                            return date.getDate() + " " + bulan + " " + date.getFullYear();
                        }
                    })



                }
            })




           
        }
    })



















    // console.log(req.query)
    // res.render("formulir")
});

router.get('/card', (req, res) => {

    var users = req.query.userId

    query = `
        SELECT 
        reg_dd.*,
        master_jenis_kel.uraian as master_jenis_kel_uraian,

        reg_fl.reg_fl_id,
        reg_fl.foto,
        reg_fl.createdAt as tgl_kirim,
        users.email

        FROM reg_dd



        JOIN master_jenis_kel
        ON master_jenis_kel.jenis_kel_id = reg_dd.jenis_kel_id

        JOIN reg_fl
        ON reg_fl.tahun_id = `+req.query.tahun_id+` AND reg_fl.gelombang_id = `+req.query.gelombang_id+` AND reg_fl.userId = reg_dd.userId

        JOIN users
        ON reg_dd.userId = users.id


        WHERE
        reg_dd.tahun_id = `+req.query.tahun_id+` AND reg_dd.gelombang_id = `+req.query.gelombang_id+` AND reg_dd.userId = '`+users+`'
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
                reg_jp.tahun_id = `+req.query.tahun_id+` AND reg_jp.gelombang_id = `+req.query.gelombang_id+` AND reg_jp.userId = '`+users+`'
            `;
            db.query(viewJurusan, (err1, row1)=>{
                if(err) {
                    console.log(err1);
                    res.send(err1);
                }else{
                    // res.send({
                    //     data : row,
                    //     jp : row1
                    // });


                    res.render("kartuUjian", {
                        data : row[0],
                        jp : row1,
                        URLX : urlServer,

                        noUrut : (params)=>{
                            return ('000' + params).slice(-4)
                        },
                        convertDate : (tgl)=>{
                            var date = new Date(tgl);
                            var getBulan = date.getMonth() + 1; var bulan = '';
                            if (getBulan == '1') {bulan = 'Jan'}
                            else if(getBulan == '2') {bulan = 'Februari'}
                            else if(getBulan == '3') {bulan = 'Maret'}
                            else if(getBulan == '4') {bulan = 'April'}
                            else if(getBulan == '5') {bulan = 'Mei'}
                            else if(getBulan == '6') {bulan = 'Juni'}
                            else if(getBulan == '7') {bulan = 'Juli'}
                            else if(getBulan == '8') {bulan = 'Agustus'}
                            else if(getBulan == '9') {bulan = 'September'}
                            else if(getBulan == '10') {bulan = 'Oktober'}
                            else if(getBulan == '11') {bulan = 'November'}
                            else if(getBulan == '12') {bulan = 'Desember'}
                            return date.getDate() + " " + bulan + " " + date.getFullYear();
                        }
                    })



                }
            })




           
        }
    })


});




router.get('/generateReport', (req, res) => {

    var gelombang_id = req.query.gelombang_id;
    var tahun_id = req.query.tahun_id;
    var userId = req.query.userId;

    // untuk mengmbil parameternya pakai req.query

    // untuk url aslinya
    // http://localhost:5014/kartu/?gelombang_id=2&tahun_id=2021&userId=i33wt8iskl54ta7i

    // untuk request
    // http://localhost:5014/kartu/generateReport?gelombang_id=2&tahun_id=2021&userId=i33wt8iskl54ta7i


    var urlnya = urlServer+`kartu/?gelombang_id=`+gelombang_id+`&tahun_id=`+tahun_id+`&userId=`+userId+``

    let options = { format: 'A4' };
    let file = [{ url: urlnya, name: 'example.pdf' }];

    html_to_pdf.generatePdfs(file, options).then(output => {
        // fs.writeFile('uploads/'+gelombang_id+''+tahun_id+''+userId+'.pdf', output[0].buffer)
        // res.send('OKey');









        const dirPath = path.join(__dirname, '../../uploads/'+gelombang_id+''+tahun_id+''+userId+'.pdf');

        fs.writeFile('uploads/'+gelombang_id+''+tahun_id+''+userId+'.pdf', output[0].buffer, function (err) {
            if (err) return console.log(err);
            console.log('Hello World > helloworld.txt');
            console.log(dirPath)

            var data =fs.readFileSync(dirPath);
            res.contentType("application/pdf");
            res.send(data);
            // res.send("OKE")
        });

















        // res.send( output[0].buffer)

        // var data = fs.readFileSync(urlServer+'uploads/'+gelombang_id+''+tahun_id+''+userId+'.pdf');
        // res.contentType("application/pdf");

        // let buff = new Buffer(output[0].buffer);
        // let base64data = buff.toString('base64');
        // res.download(base64data)
        // res.download(urlServer+'uploads/'+gelombang_id+''+tahun_id+''+userId+'.pdf')
    });
})


router.get('/generateCard', (req, res) => {

    var gelombang_id = req.query.gelombang_id;
    var tahun_id = req.query.tahun_id;
    var userId = req.query.userId;

    var urlnya = urlServer+`kartu/card?gelombang_id=`+gelombang_id+`&tahun_id=`+tahun_id+`&userId=`+userId+``

    let options = { format: 'A4' , landscape:true};
    let file = [{ url: urlnya, name: 'example.pdf' }];

    html_to_pdf.generatePdfs(file, options).then(output => {

        const dirPath = path.join(__dirname, '../../uploads/card'+gelombang_id+''+tahun_id+''+userId+'.pdf');

        fs.writeFile('uploads/card'+gelombang_id+''+tahun_id+''+userId+'.pdf', output[0].buffer, function (err) {
            if (err) return console.log(err);
            console.log('Hello World > helloworld.txt');
            console.log(dirPath)

            var data =fs.readFileSync(dirPath);
            res.contentType("application/pdf");
            res.send(data);
            // res.send("OKE")
        });

















        // res.send( output[0].buffer)

        // var data = fs.readFileSync(urlServer+'uploads/'+gelombang_id+''+tahun_id+''+userId+'.pdf');
        // res.contentType("application/pdf");

        // let buff = new Buffer(output[0].buffer);
        // let base64data = buff.toString('base64');
        // res.download(base64data)
        // res.download(urlServer+'uploads/'+gelombang_id+''+tahun_id+''+userId+'.pdf')
    });
})



router.post('/view', (req, res) => {
    var form = req.query.pb

    // console.log(req.body)

    let query = `
        SELECT 
        reg_ot.*
       
        FROM reg_ot

        WHERE 
        reg_ot.userId = '`+ req.user._id + `' AND 
        reg_ot.tahun_id = `+ form.tahun_id + ` AND
        reg_ot.gelombang_id = `+ form.gelombang_id + `

    `
    db.query(query, (err, row) => {
        if (err) {
            res.json(err)
        } else {
            res.json(row)
        }
    })

});



module.exports = router;