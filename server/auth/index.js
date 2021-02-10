const express = require('express');
const Joi = require('joi');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
var uniqid = require('uniqid');

var dbs = require('../db/MySql/dbutama');


const router = express.Router();

const schema = Joi.object().keys({
    username: Joi.string().regex(/^[a-zA-Z0-9_]*$/).min(6).max(13).required(),
    password: Joi.string().min(6).required(),
    
});



router.get('/', (req, res) => {
    res.json({
        message: 'kiken-login'
    });
});

router.post('/signup', (req, res, next) => {

    const request = {
        username : req.body.username,
        password : req.body.password,
    }

    const result = Joi.validate(request, schema);

    if (result.error === null) {
        // res.json(result.error)
       
        let view = `SELECT * FROM users where username = '`+req.body.username+`' `;
        dbs.query(view, (err, row)=>{
            if(row.length <= 0) {
                console.log("USERNAME BELUM ADA");
                
                bcrypt.hash(req.body.password.trim(), 12).then(hashedPassword => {
                        
                    const id = uniqid();
                    const nama = req.body.nama;
                    const email = req.body.email;
                    const username = req.body.username;
                    const password = hashedPassword;

                    let insert = `
                        INSERT INTO users (id, nama, email, username, password, createAt)
                        VALUES ('`+id+`', '`+nama+`', '`+email+`', '`+username+`', '`+password+`', NOW());
                    `;
                    dbs.query(insert, (err, row)=>{
                        if(err) {
                            console.log(err);
                            
                            res.send('Gagal dalam proses pembuatan username');
                        }else{
                            // res.send(row);
                            res.json(result.error)
                        }
                    })

                });
            }else{
                console.log("USERNAME SUDAH ADA");
                const error = new Error('Username sudah terpakai oleh user lain');
                
                res.status(409);
                next(error);
            }
        })
    } else {
        // res.status(422);
        // next(result.error);
        res.send(result.error.details[0])
    }
});

router.post('/login', (req, res, next) =>{

    const result = Joi.validate(req.body, schema);
    console.log("=========================");
    console.log(req.body.username);
    
    if (result.error === null) {

        let view = ` 
        SELECT * FROM users WHERE username = '`+req.body.username+`';`;

        dbs.query(view, (err, row)=>{

            if(row.length <= 0) {
                respondError422(res, next, "Username Salah");
            }else{

                var user = {}
                for (var i in row) {user = row[i]}
                // res.send(user);

                const payload =  {
                    _id: user.id,
                    username : user.username,
                    profile : {
                        nama : user.nama,
                        email : user.email,
                        username : user.username,
                        menu_klp : user.menu_klp,
                    }
                };
                
                console.log("Token_secret : ", process.env.TOKEN_SECRET);


                bcrypt.compare(req.body.password, user.password).then((result) => {
                    // Jika client mengirimkan password yang benar
                    if(result){
                        jwt.sign(payload, process.env.TOKEN_SECRET, {
                            expiresIn: '24h'
                        }, (err, token) => {
                            if(err){
                                console.log(err);
                                
                                respondError422(res, next, "Kesalahan dlm pembuatan token");
                            }else{
                                res.json({
                                    token : token,
                                    profile : payload
                                });
                            }
                        })
                    }else{
                        respondError422(res, next, "Password salah");
                    }
                });

            }
        })
    }else{
        respondError422(res, next, "Gagal Login Periksa kembali username atau password anda..!");
    }
});


function respondError422(res, next, text){
    res.status(422);
    const error = new Error(text);
    next(error);
}



module.exports = router;