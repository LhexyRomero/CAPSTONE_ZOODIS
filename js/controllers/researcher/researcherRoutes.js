const express = require('express');
const router = express.Router();

router.get('/index',(req,res,next)=>{
    res.render('researcher/index');
});

router.get('/about',(req,res,next)=>{
    res.render('researcher/about');
}); 

module.exports = router;