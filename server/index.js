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