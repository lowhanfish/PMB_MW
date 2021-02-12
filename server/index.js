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

    const master_agama = require('./apiMysql/dataMaster/pmb/master_agama');
    app.use('/api/v1/master_agama', middleware.isLoggedIn, master_agama);
    const master_gelombang = require('./apiMysql/dataMaster/pmb/master_gelombang');
    app.use('/api/v1/master_gelombang', middleware.isLoggedIn, master_gelombang);
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
    app.use('/api/v1/master_tahun', middleware.isLoggedIn, master_tahun);
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
    

    // END MAIN SERVER



   


    // PUBLISH

   
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