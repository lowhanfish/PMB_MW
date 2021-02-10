const express = require('express');
const Joi = require('joi');
const bcrypt = require('bcryptjs');
var uniqid = require('uniqid');
var db = require('../../../db/MySql/dbutama');



const router = express.Router();


router.post('/aa', (req, res) => {
    console.log(req.body)
    res.send('oke')
});



router.post('/view', (req, res) => {
    var data_batas = parseInt(req.body.page_limit);
    var data_star = (req.body.data_ke - 1) * data_batas;
    var cari = req.body.cari_value;
    var halaman = 1;

    let jml_data = ` SELECT * FROM users `;

    let view = `
        SELECT

        users.id,
        users.username,
        users.nama,
        users.hp,
        users.email,
        users.menu_klp,
        menu_klp.uraian as menu_klp_uraian

        FROM users
        
        LEFT JOIN menu_klp
        ON menu_klp.id = users.menu_klp

        LIMIT `+ data_star + `,` + data_batas + `
    `;

    db.query(jml_data, (err, row) => {
        if (err) {
            console.log(err);
            res.json(err)
        } else {
            halaman = Math.ceil(row.length / data_batas);
            if (halaman < 1) { halaman = 1 }
            // ========================
            db.query(view, (err, result) => {
                if (err) { res.json(err) }
                else {
                    halaman = Math.ceil(row.length / data_batas);
                    if (halaman < 1) { halaman = 1 }
                    res.json({
                        data: result,
                        jml_data: halaman,
                        total: row.length,
                    })
                }
            })
            // ========================

        }
    })
});





router.post('/signup', (req, res, next) => {

    console.log(req.body)

    const request = {
        username: req.body.username,
        password: req.body.password,
    }

    const result = Joi.validate(request, schema);
    console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')

    if (result.error === null) {

        
        let view = `
            SELECT * 
            FROM users
            WHERE 
            users.username = '`+ req.body.username +`' OR users.email = '`+req.body.email +`'
        `

        db.query(view, (err, row) => {
            if (err) {
                console.log(err);
                res.send(err);
            } else{
                if (row.length <= 0) {
                    bcrypt.hash(req.body.password.trim(), 12).then(hashedPassword => {

                        const query = `
                            INSERT INTO users (id, username, nama, hp, email, password, menu_klp)
                            VALUES (
                                '`+uniqid()+`',
                                '`+req.body.username+`',
                                '`+req.body.nama+`',
                                '`+req.body.hp+`',
                                '`+req.body.email+`',
                                '`+hashedPassword+`',
                                `+req.body.menu_klp+`
                            )
                        `

                        db.query(query, (err, row) => {
                            if (err) {
                                console.log(err)
                                res.send('Gagal dalam meregistrasi ');
                            }else{
                                console.log('suksesssssssssssssssss')
                                res.send(row);
                            }
                        })

                    });

                }else{
                    const error = new Error('Username atau email sudah digunakan sebelumnya');
                    res.status(409);
                    next(error);
                }
            }
        })

        // db.query(view)
        //     .then(cursor => cursor.all())
        //     .then((row, err) => {
        //         if (row.length <= 0) {



        //             bcrypt.hash(req.body.password.trim(), 12).then(hashedPassword => {

        //                 const data = {
        //                     id: uniqid(),
        //                     email: req.body.email,
        //                     level: req.body.level,
        //                     nama: req.body.nama,
        //                     hp: req.body.hp,
        //                     username: req.body.username,
        //                     password: hashedPassword
        //                 }
        //                 var reques = JSON.stringify(data)

        //                 let insert = `insert ` + reques + ` into users`

        //                 db.query(insert)
        //                     .then(cursor => cursor.all())
        //                     .then((row, err) => {
        //                         if (err) {
        //                             console.log(err)
        //                             res.send('Gagal dalam meregistrasi ');
        //                         } else {
        //                             console.log('suksesssssssssssssssss')
        //                             res.send(row);
        //                         }
        //                     });

        //             });


        //         } else {
        //             const error = new Error('Username atau email sudah digunakan sebelumnya');
        //             res.status(409);
        //             next(error);
        //         }
        //     });


    } else {
        res.status(422);
        next(result.error);
    }

});




router.post('/editData', (req, res) => {

    console.log(req.body)
    console.log("ASSSSSSSSSSSSSSSUU")
    var query = `
        UPDATE users SET

        menu_klp = `+req.body.menu_klp+`,
        nama = '`+req.body.nama+`',
        username = '`+req.body.username+`',
        email = '`+req.body.email+`',
        hp = '`+req.body.hp+`'


        WHERE id = '`+req.body.id+`'
    `
    db.query(query, (err, row)=>{
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            console.log('Sukses mengubah data');
            res.send(row);
        }
    })
})



router.post('/editDataPass', (req, res) => {

    bcrypt.hash(req.body.password.trim(), 12).then(hashedPassword => {

        const query = `
            UPDATE users SET

            password = '`+hashedPassword+`'
            WHERE id = '`+req.body.id+`'
        `

        db.query(query, (err, row) => {
            if (err) {
                console.log(err)
                res.send('Gagal dalam meregistrasi ');
            }else{
                console.log('suksesssssssssssssssss')
                res.send(row);
            }
        })

    });

   
})



router.post('/removeData', (req, res) => {
    console.log(req.body)
    var query = `
        DELETE FROM users WHERE id = '`+ req.body.id + `';
    `;
    dbs.query(query, (err, row) => {
        if (err) {
            console.log(er)
            res.send(err);
        } else {

            res.send(row);
        }
    });
})



const schema = Joi.object().keys({
    username: Joi.string().regex(/^[a-zA-Z0-9_]*$/).min(3).max(14).required(),
    password: Joi.string().min(6).required(),
});



module.exports = router;