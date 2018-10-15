const express = require('express');
const router = express.Router();

const upload = require('../../fileUpload');

const auth = require('../authentication');
const contri_auth = require('../contributors/auth');
const contri_animal = require('../contributors/animal');
const contri_bacteria = require('../contributors/bacteria');
const contri_disease = require('../contributors/disease');
const contri_prevention = require('../contributors/prevention');
const contri_notification = require('../contributors/notification');
const contri_profile = require('../contributors/profile');
const contri_search = require('../contributors/search');
const conrti_query  = require('../contributors/query');

router.use((req,res,next)=>{ //Add initial middleware to ensure all request below will have staffData(if there is)
    res.locals.staffData = req.session.staffData;
    next();
});

router.get('/contri_*', auth.authenticate, (req,res,next)=>{
    if(req.session.accType == 1) return next();
    res.redirect('/login');
}); 

router.get('/contri_user',auth.authenticate,(req,res,next)=>{
    res.render('contributor/contri_user');
});

router.get('/contri_viewProfile',contri_profile.viewProfile);
router.post('/contri_updateProfile',contri_profile.updateProfile);

router.get('/contri_Animal',auth.authenticate,(req,res,next)=>{
    res.render('contributor/contri_Animal');
});

router.post('/contri_animal',upload.single("contri_animalImg"), contri_auth, contri_animal.addAnimal);

router.get('/contri_viewAnimal/:id',contri_animal.viewAnimal);
router.get('/contri_animalList',contri_animal.animalList);

router.get('/contri_animalTaxon',auth.authenticate,(req,res,next)=>{
    res.render('contributor/contri_AnimalTaxon');
});

router.post('/contri_animalTaxon', contri_auth, contri_animal.addAnimalTaxon);

router.get('/contri_animalTaxonList',contri_animal.animalTaxonList);
router.get('/contri_viewAnimalTaxon/:id',contri_animal.viewAnimalTaxon);
router.get('/contri_toSelectJournal',contri_animal.toSelectJournal);

router.get('/contri_Bacteria',auth.authenticate,(req,res,next)=>{
    res.render('contributor/contri_Bacteria');
});

router.post('/contri_bacteriaTaxon', contri_auth, contri_bacteria.addBacteriaTaxon);
router.post('/contri_bacteria', contri_auth, contri_bacteria.addBacteria);
router.post('/contri_bacteriaHost',contri_bacteria.bacteriaHost);
router.get('/contri_bacteriaList',contri_bacteria.bacteriaList);
router.get('/contri_bacteriaTaxonList',contri_bacteria.bacteriaTaxonList);
router.get('/contri_viewBacteriaTaxon/:id',contri_bacteria.viewBacteriaTaxon);
router.get('/contri_toSelectJournal1',contri_bacteria.toSelectJournal);
router.get('/contri_toSelectAnimal',contri_bacteria.toSelectAnimal);
router.get('/contri_viewBacteria/:id',contri_bacteria.viewBacteria);


router.get('/contri_BacteriaTaxon',auth.authenticate,(req,res,next)=>{
    res.render('contributor/contri_BacteriaTaxon');
});

router.get('/contri_Disease',auth.authenticate,(req,res,next)=>{
    res.render('contributor/contri_Disease');
});

router.post('/contri_disease', contri_auth, contri_disease.addDisease);
router.get('/contri_diseaseList',contri_disease.diseaseList);
router.get('/contri_viewDisease/:id',contri_disease.viewDisease);

router.get('/contri_Prevention',auth.authenticate,(req,res,next)=>{
    res.render('contributor/contri_Prevention');
});

router.post('/contri_addPrevention', contri_auth, contri_prevention.addPrevention);
router.get('/contri_toSelectDisease',contri_prevention.toSelectDisease);
router.get('/contri_preventionList',contri_prevention.preventionList);
router.get('/contri_viewPrevention/:id',contri_prevention.viewPrevention);

router.get('/contri_Toxin',auth.authenticate,(req,res,next)=>{
    res.render('contributor/contri_Toxin');
});

router.post('/contri_toxin', contri_auth, contri_bacteria.addToxin);

router.get('/contri_toxinList',contri_bacteria.toxinList);
router.get('/contri_toSelectBacteria' , contri_bacteria.toSelectBacteria);
router.get('/contri_viewToxin/:id',contri_bacteria.viewToxin);

router.get('/contri_Dashboard', auth.authenticate, (req,res,next)=>{
    res.render('contributor/contri_Dashboard');
});

router.get('/contri_Notification', auth.authenticate, (req,res,next)=>{
    res.render('contributor/contri_Notification');
});

router.get('/notiCard',contri_notification.notiCard);
router.get('/notifyJournal',contri_notification.notifyJournal);
router.get('/downloadJournal/:filename',contri_notification.downloadJournal);

router.post('/setJournal',contri_notification.setJournal);
router.post('/updateNotiCard/:id',contri_notification.updateNotiCard);
router.post('/finishedJournal',contri_notification.finishedJournal);

router.get('/search/bodySite',contri_search.bodySite);
router.get('/addedData',conrti_query.addedData);


module.exports = router;