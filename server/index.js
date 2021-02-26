const express = require('express');
// const volleyball = require('volleyball');
const cors = require('cors');
var path = require("path");

require('dotenv').config();



const app = express();

const middleware = require('./auth/middlewares');
const auth = require('./auth');


// app.use(volleyball);

app.use(cors({
  // origin : 'http://localhost:8081'
  origin : '*'
}));
app.use(express.json());
app.use(middleware.checkTokenSeetUser);

// 1. sebelumnya tentukan dulu folder staticnya, maksudnya yg dapat diakses oleh publik tanpa terpengaruh route
app.use(express.static('public'));
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/img', express.static(__dirname + 'public/img'))
app.use('/js', express.static(__dirname + 'public/js'))

// 2. selanjutnya set dulu inisial folder views-nya 
app.set('views', './views')

// 3. setelah itu kita tentukan template engine yg akan kita gunakan
app.set('view engine', 'ejs')



app.get('/', (req, res) => {
  res.json({
    message: '🦄🌈✨Hello Konsel, Anda mengunjugi alamat yg salah... mungkin maksud anda http://konaweselatankab.go.id ! 🌈✨🦄',
    user : req.user
  });
});


app.use('/auth', auth);
app.use('/uploads', express.static(path.join(__dirname, './uploads')))

const checkAuth = require('./apiMysql/coba');
app.use('/checkAuth', middleware.isLoggedIn, checkAuth);

    const check_connections = require('./auth/check_connections');
    app.use('/check_connections', middleware.isLoggedIn, check_connections);

    // ================================== BATAS =====================================================



    const menuList = require('./apiMysql/dataMaster/authorization/menuList');
    app.use('/api/v1/menuList', middleware.isLoggedIn, menuList);


    const kelompokUsers = require('./apiMysql/dataMaster/authorization/kelompokUsers');
    app.use('/api/v1/kelompokUsers', middleware.isLoggedIn, kelompokUsers);

    const registrasi = require('./apiMysql/dataMaster/authentication/registrasi');
    app.use('/api/v1/registrasi', middleware.isLoggedIn, registrasi);



    // MAIN SERVER

    const dashboard = require('./apiMysql/mainPMB/dashboard');
    app.use('/api/v1/dashboard', middleware.isLoggedIn, dashboard);

    const master_agama = require('./apiMysql/dataMaster/pmb/master_agama');
    app.use('/api/v1/master_agama', middleware.isLoggedIn, master_agama);
    const master_gelombang = require('./apiMysql/dataMaster/pmb/master_gelombang');
    app.use('/api/v1/master_gelombang', master_gelombang);
    const master_jenis_kel = require('./apiMysql/dataMaster/pmb/master_jenis_kel');
    app.use('/api/v1/master_jenis_kel', middleware.isLoggedIn, master_jenis_kel);
    const master_jurusan = require('./apiMysql/dataMaster/pmb/master_jurusan');
    app.use('/api/v1/master_jurusan', middleware.isLoggedIn, master_jurusan);
    const master_pendidikan_jurusan = require('./apiMysql/dataMaster/pmb/master_pendidikan_jurusan');
    app.use('/api/v1/master_pendidikan_jurusan', middleware.isLoggedIn, master_pendidikan_jurusan);
    const master_pendidikan = require('./apiMysql/dataMaster/pmb/master_pendidikan');
    app.use('/api/v1/master_pendidikan', middleware.isLoggedIn, master_pendidikan);
    const master_prodi = require('./apiMysql/dataMaster/pmb/master_prodi');
    app.use('/api/v1/master_prodi', middleware.isLoggedIn, master_prodi);
    const master_program = require('./apiMysql/dataMaster/pmb/master_program');
    app.use('/api/v1/master_program', middleware.isLoggedIn, master_program);
    const master_program_strata = require('./apiMysql/dataMaster/pmb/master_program_strata');
    app.use('/api/v1/master_program_strata', middleware.isLoggedIn, master_program_strata);
    const master_tahun_studi = require('./apiMysql/dataMaster/pmb/master_tahun_studi');
    app.use('/api/v1/master_tahun_studi', middleware.isLoggedIn, master_tahun_studi);
    const master_tahun = require('./apiMysql/dataMaster/pmb/master_tahun');
    app.use('/api/v1/master_tahun', master_tahun);
    const masterFakultas = require('./apiMysql/dataMaster/pmb/masterFakultas');
    app.use('/api/v1/masterFakultas', middleware.isLoggedIn, masterFakultas);

    const master_des_kel = require('./apiMysql/dataMaster/wilayah/master_des_kel');
    app.use('/api/v1/master_des_kel', middleware.isLoggedIn, master_des_kel);
    const master_kecamatan = require('./apiMysql/dataMaster/wilayah/master_kecamatan');
    app.use('/api/v1/master_kecamatan', middleware.isLoggedIn, master_kecamatan);
    const master_kabupaten = require('./apiMysql/dataMaster/wilayah/master_kabupaten');
    app.use('/api/v1/master_kabupaten', middleware.isLoggedIn, master_kabupaten);
    const master_provinsi = require('./apiMysql/dataMaster/wilayah/master_provinsi');
    app.use('/api/v1/master_provinsi', middleware.isLoggedIn, master_provinsi);

    const verifikasi = require('./apiMysql/mainPMB/verifikasi');
    app.use('/api/v1/verifikasi', middleware.isLoggedIn, verifikasi);
    const laporanVerifikasi = require('./apiMysql/mainPMB/laporanVerifikasi');
    app.use('/api/v1/laporanVerifikasi', middleware.isLoggedIn, laporanVerifikasi);

    const dokPersiapan = require('./apiMysql/mainPMB/dokPersiapan');
    app.use('/api/v1/dokPersiapan', middleware.isLoggedIn, dokPersiapan);
    const dokTahapPendaftaran = require('./apiMysql/mainPMB/dokTahapPendaftaran');
    app.use('/api/v1/dokTahapPendaftaran', middleware.isLoggedIn, dokTahapPendaftaran);
    const dokInfografisFak = require('./apiMysql/mainPMB/dokInfografisFak');
    app.use('/api/v1/dokInfografisFak', middleware.isLoggedIn, dokInfografisFak);
    // END MAIN SERVER


    // PUBLISH
    const publish_as = require('./apiMysql/publish/as');
    app.use('/api/v1/publish_as', middleware.isLoggedIn, publish_as);
    const publish_bt = require('./apiMysql/publish/bt');
    app.use('/api/v1/publish_bt', middleware.isLoggedIn, publish_bt);
    const publish_dd = require('./apiMysql/publish/dd');
    app.use('/api/v1/publish_dd', middleware.isLoggedIn, publish_dd);
    const publish_fl = require('./apiMysql/publish/fl');
    app.use('/api/v1/publish_fl', middleware.isLoggedIn, publish_fl);
    const publish_jp = require('./apiMysql/publish/jp');
    app.use('/api/v1/publish_jp', middleware.isLoggedIn, publish_jp);
    const publish_ot = require('./apiMysql/publish/ot');
    app.use('/api/v1/publish_ot', middleware.isLoggedIn, publish_ot);

    const kartu = require('./apiMysql/publish/kartu');
    app.use('/kartu', kartu);

    const publishDokPersiapan = require('./apiMysql/publish/publishDokPersiapan');
    app.use('/api/v1/publishDokPersiapan', publishDokPersiapan);
    const publishDokInfografisFak = require('./apiMysql/publish/publishDokInfografisFak');
    app.use('/api/v1/publishDokInfografisFak', publishDokInfografisFak);


   
    // PUBLISH

    // ================================== BATAS =====================================================

// >>>>>>> d3108e8369f9f0f379270f0f6f53f5b9ef7abde6


function notFound(req, res, next) {
  res.status(404);
  const error = new Error('Not Found data - ' + req.originalUrl);
  next(error);
}

function errorHandler(err, req, res, next) {
  res.status(res.statusCode || 500);
  res.json({
    message: err.message,
    stack: err.stack
  });
}

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 5014;
const server = app.listen(port, () => {
  console.log('Listening on port', port);
});