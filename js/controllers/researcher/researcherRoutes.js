const express = require('express');
const router = express.Router();

router.use((req,res,next)=>{ //Add initial middleware to ensure all request below will have staffData(if there is)
    res.locals.staffData = req.session.staffData;
    next();
});

router.get('/index',(req,res,next)=>{
    res.render('researcher/index');
});

router.get('/about',(req,res,next)=>{
    res.render('researcher/about');
}); 

router.get('/contact',(req,res,next)=>{
    res.render('researcher/contact');
});

router.get('/collab',(req,res,next)=>{
    res.render('researcher/collab');
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