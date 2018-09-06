const express = require('express');
const router = express.Router();

router.get('/index',(req,res,next)=>{
    res.render('researcher/index');
});

router.get('/about',(req,res,next)=>{
    res.render('researcher/about');
}); 

router.get('/contact',(req,res,next)=>{
    res.render('researcher/contact');
});

router.get('/microbiota',(req,res,next)=>{
    res.render('researcher/microbiota');
});

router.get('/researcher_animal',(req,res,next)=>{
    res.render('researcher/researcher_animal');
});

router.get('/researcher_bacteria',(req,res,next)=>{
    res.render('researcher/researcher_bacteria');
});

router.get('/researcher_disease',(req,res,next)=>{
    res.render('researcher/researcher_disease');
});

module.exports = router;