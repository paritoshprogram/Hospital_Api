const express = require('express');
const router = express.Router();

router.get('/',(req,res)=>{
    res.send('Hi')
    console.log('Router Connected')
})

router.use('/users', require('./users'));


module.exports = router;