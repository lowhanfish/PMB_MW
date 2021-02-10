const express = require('express');
const router = express.Router();





router.get('/checkAuth', (req, res)=>{
   res.send('OK')
})

module.exports = router;
