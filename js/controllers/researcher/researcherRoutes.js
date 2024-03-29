const express = require('express');

const router = express.Router();
const auth = require('../authentication');
const upload = require('../../fileUpload');
const journal = require('../researcher/journal');
const contact = require('../researcher/contact');
const search = require('../researcher/search');
const query = require('../researcher/query');
const animalSearching = require('../researcher/searchingAnimal');
const bacteriSearching = require('../researcher/searchingBacteria');
const diseaseSearching = require('../researcher/searchingDisease');
const toxinSearching = require('../researcher/searchingToxin');

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

router.get('/researcher_toxin',(req,res,next)=>{
    res.render('researcher/researcher_toxin');
});

router.get('/toxinModule',toxinSearching.toxinModule);

router.get('/researcher_animal',(req,res,next)=>{
    res.locals.view = true;
    res.render('researcher/researcher_animal');
});

router.get('/view_animal',animalSearching.viewAnimal,(req,res,next)=>{
    res.render('researcher/view_animal');
});

router.get('/view_bacteria',bacteriSearching.viewBacteria,(req,res,next)=>{
    res.render('researcher/view_bacteria');
});

router.get('/view_toxin',toxinSearching.viewToxin,(req,res,next)=>{
    res.render('researcher/view_toxin');
});

router.get('/animalModules',animalSearching.animalModules);

router.get('/researcher_bacteria',(req,res,next)=>{
    res.locals.view = true;
    res.render('researcher/researcher_bacteria');
});

router.get('/bacteriaModules',bacteriSearching.bacteriaModules);

router.get('/researcher_disease',(req,res,next)=>{
    res.locals.view = true;
    res.render('researcher/researcher_disease');
});

router.get('/diseaseModules',diseaseSearching.diseaseModules);

router.get('/view_disease',diseaseSearching.viewDisease,(req,res,next)=>{
    res.render('researcher/view_disease');
});
//Searching
router.post('/researcher_animal',animalSearching.searchingAnimal,(req,res,next)=>{
    res.render('researcher/researcher_animal');
});

router.post('/researcher_bacteria', bacteriSearching.searchingBacteria,(req,res,next)=>{
    res.render('researcher/researcher_bacteria');
});

router.post('/researcher_disease',diseaseSearching.searchingDisease,(req,res,next)=>{
    res.render('researcher/researcher_disease');
});

//Autocomplete
router.get('/search/animalName',search.animalName);
router.get('/search/diseaseName',search.diseaseName);
router.get('/search/bacteriaScientificName',search.bacteriaScientificName);

//Query
router.get('/animalQuery',query.animalQuery);
router.get('/bacteriaQuery',query.bacteriaQuery);
router.get('/numberBacteria',query.numberBacteria);

module.exports = router;