const nodemailer = require('nodemailer');
var config = require('../configuration/config');

var alamatClient = config.alamatClient
var alamatServer = config.alamatServer


let transport = nodemailer.createTransport({
    host: 'mail.univ-mw.com',
    port: 587,
    auth: {
        user: 'pmb@univ-mw.com',
        pass: 'fTbABEWYhU5S55'
    },
    tls: {
        rejectUnauthorized: false
    }
});





const emailHTML = (to, status, keterangan, gelombang_id, tahun_id, userId)=>{
    var judul = 1;
    var isi = ''

    if (status == 2) {
        judul = 'KONFIRMASI PENDAFTARAN'
        isi = `
        
        <span style="color:#7fb959; font-size:14pt; font-weight:bold">TER-KONFIRMASI</span> <br><br>
        <span style="color: #5e5e5e; font-size:12pt;">Formulir pendaftaran, lampiran dan bukti pembayaran telah dikonfirmasi</span> <br><br>
        <span style="color: #5e5e5e; font-size:12pt;">Silahkan menuju ke link resmi PMB Universitas Mandala Waluya Kendari dengan memilih tahun dan gelombang pendaftaran yang berkesesuaian. Untuk mencetak formulir <b><a href="`+alamatServer+`kartu/generateReport?gelombang_id=`+gelombang_id+`&tahun_id=`+tahun_id+`&userId=`+userId+`">click di sini</a></b> atau kartu ujian <b><a href="`+alamatServer+`kartu/generateCard?gelombang_id=`+gelombang_id+`&tahun_id=`+tahun_id+`&userId=`+userId+`">click di sini</a></b> dan atau silahkan click gambar dibawah ini, dan masuk ke form registrasi</span> <br><br>

        <a href="`+alamatClient+`">
            <img style="max-width: 300px; height:auto" src="`+alamatClient+`/images/logo.png" alt="">
        </a>
        <br><br>
        <span style="color: #5e5e5e; font-size:11pt; font-weight: 700;">Terimakasih dan mohon untuk TIDAK membalas email ini. (By System PMB)</span>
        
        `
    } else {
        judul = 'PENGEMBALIAN FORM PENGISIAN'
        isi = `
            <span style="color:#b95959; font-size:14pt; font-weight:bold">Ups.. Mohon Maaf</span> <br><br>
            <span style="color: #5e5e5e; font-size:12pt;">Sepertinya terjadi kekeliruan dalam mengisi form pendaftaran</span> <br>
            <span style="color: #5e5e5e; font-size:12pt; font-weight: 600;">Dengan alasan pengembalian : </span> 
            <span style="color: #5e5e5e; font-size:12pt; font-weight: 600;"><i style="color:#b95959">`+keterangan+`</i></span> <br><br>
            <span style="color: #5e5e5e; font-size:12pt;">Silahkan menuju ke link resmi PMB Universitas Mandala Waluya Kendari dengan memilih tahun dan gelombang pendaftaran yang berkesesuaian. Untuk melakukan perbaikan data silahkan click gambar ini, dan masuk ke form registrasi</span> <br><br>
            <a href="`+alamatClient+`">
                <img style="max-width: 300px; height:auto" src="`+alamatClient+`/images/logo.png" alt="">
            </a>
            <br><br>
            <span style="color: #5e5e5e; font-size:11pt; font-weight: 700;">Terimakasih dan mohon untuk TIDAK membalas email ini. (By System PMB)</span>
        `
        // <img style="max-width: 300px; height:auto" src="`+alamatClient+`img/btn_reg.png" alt="">
    }


    const message = {
        from: 'pmb@univ-mw.com', // Sender address
        to: to,         // List of recipients
        subject: judul, // Subject line
        html : isi
    };
    transport.sendMail(message, function(err, info) {
        if (err) {
            console.log("ERROOOOORRR")
          console.log(err)
        } else {
            console.log("SUKSESSSSS")
          console.log(info);
        }
    });
}

const emailTEXT = (to, judul, isi)=>{
    const message = {
        from: 'pmb@univ-mw.com', // Sender address
        to: to,         // List of recipients
        subject: judul, // Subject line
        text: isi // Plain text body
    };
    transport.sendMail(message, function(err, info) {
        if (err) {
            console.log("ERROOOOORRR")
          console.log(err)
        } else {
            console.log("SUKSESSSSS")
          console.log(info);
        }
    });
}


module.exports = {
    emailHTML : emailHTML,
    emailTEXT : emailTEXT,
}


