const express = require('express');
var db = require('../../../db/MySql/dbutama');



// var uniqid = require('uniqid');
const router = express.Router();





router.post('/view', (req, res) => {
    // console.log(req.body)
   var query = `
       SELECT * FROM menu
       ORDER BY urutan
   `
   db.query(query, (err, rows)=>{
        if (err) {
            console.log(err);
            res.send(err);
        } else {

            const nest = (items, id = null, link = 'parrent') =>
            items
                .filter(item => item[link] === id)
                .map(item => ({ ...item, subItem: nest(items, item.id) }));

            // console.log(
            //     nest(rows)
            // )


            res.send(nest(rows))




        }
   })

});




router.post('/addData', (req, res) => {
    // console.log(req.body)
   var query = `
        INSERT INTO menu (title, icon, route, type, jenis, parrent, urutan)
        VALUES 
        ('`+req.body.title+`','`+req.body.icon+`','`+req.body.route+`', `+req.body.type+`, `+req.body.jenis+`, `+req.body.parrent+`, `+req.body.urutan+`)
   `
   db.query(query, (err, row)=>{
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            console.log('Sukses menginput data');
            res.send(row);
        }
   })

});

router.post('/editData', (req, res)=>{
    console.log(req.body)
    var query = `
        UPDATE menu SET
        title = '`+req.body.title+`',
        icon = '`+req.body.icon+`',
        route = '`+req.body.route+`',
        type = `+req.body.type+`,
        jenis = `+req.body.jenis+`,
        parrent = `+req.body.parrent+`,
        urutan = `+req.body.urutan+`

        WHERE id = `+req.body.id+`
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


router.post('/removeData', (req, res)=>{
    var query = `
        DELETE FROM menu WHERE id = `+req.body.id+`; 
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

