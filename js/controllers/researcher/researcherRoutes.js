const express = require('express');

const router = express.Router();
const auth = require('../authentication');
const upload = require('../../fileUpload');
const journal = require('../researcher/journal');
const contact = require('../researcher/contact');
const search = require('../researcher/search');
const animalSearching = require('../researcher/searchingAnimal');

router.use((req,res,next)=>{ //Add initial middleware to ensure all request below will have staffData(if there is)
    res.locals.staffData = req.session.staffData;
    next();
});

router.route('/registerResearcher')
    .get((req,res,next)=>{
        var result = req.query.error || false;
        res.render('researcher/index',{regError: result});
    })
    .post(auth.researcherRegister);

router.post('/verify', auth.researcherConfirm);

router.get('/index',(req,res,next)=>{
    res.render('researcher/index');
});

router.get('/about',(req,res,next)=>{
    res.render('researcher/about');
}); 

router.get('/contact',(req,res,next)=>{
    res.render('researcher/contact');
});

router.get('/collab',auth.authenticate,(req,res,next)=>{
    res.render('researcher/collab');
});

router.post('/uploadJournal',upload.single('myfile'),journal.uploadJournal);
router.post('/collabMessage',contact.collabMessage);
router.post('/contactMessage',contact.contactMessage);

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

//Searching
router.post('/searchingAnimal',animalSearching.searchingAnimal);


//Autocomplete
router.get('/search/animalName',search.animalName);

module.exports = router;