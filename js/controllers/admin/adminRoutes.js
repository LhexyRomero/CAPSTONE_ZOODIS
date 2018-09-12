
const express = require('express');
const router = express.Router();

const upload = require('../../fileUpload');

const auth = require('../authentication');
const animal = require('../admin/animal');
const bacteria = require('../admin/bacteria');
const search = require('../admin/search');
const disease = require('../admin/disease');
const prevention = require('../admin/prevention');
const notification = require('../admin/notification');
const journal = require('../admin/journal');
const reject = require('../admin/reject');
const staff = require('../admin/staff');
const sample = require('../admin/sample');

router.get('/', (_,res,__)=>{
    res.redirect('/index');
});

router.route('/login')
    .post(auth.login, auth.authRedirect)
    .get(auth.authRedirect,(req,res,next)=>{
        res.locals.logFail = req.query.failed || false;
        res.render('login', res.locals);
    });

router.get('/logout', auth.logout); 

router.get('/register',(req,res,next)=>{
    var result = req.query.error || false;
    res.render('register',{regError: result});
});
router.post('/register', auth.register);

//Search Router, for searching taxonomy of animal and bacteria
router.get('/search/animal', search.animal);
router.get('/search/bacteriaGenus',search.bacteriaGenus);
router.get('/search/bacteriaSpecies',search.bacteriaSpecies);

router.get('/dashboard', auth.authenticate,(req,res,next)=>{
    res.render('admin/dashboard');
});

router.get('/sampleAlgo',auth.authenticate,(req,res,next)=>{
    res.render('admin/sampleAlgo');
});

router.post('/sample',sample.sample);

router.get('/user',auth.authenticate,(req,res,next)=>{
    res.render('admin/user');
});

router.get('/hostTable', auth.authenticate,(req,res,next)=>{
    res.render('admin/hostTable');
});

router.get('/diseaseTable', auth.authenticate,(req,res,next)=>{
    res.render('admin/diseaseTable');
});

router.get('/rejectTable', auth.authenticate,(req,res,next)=>{
    res.render('admin/rejectTable');
});

router.get('/rejectTableList',auth.authenticate,reject.rejectTable);

router.get('/animalTaxon', auth.authenticate, (req,res,next)=>{
    res.render('admin/animalTaxon');
});
router.post('/animalTaxon', animal.addAnimalTaxon);
router.post('/updateAnimalTaxon/:id',animal.updateAnimalTaxon);
router.get('/animalTaxonList',animal.animalTaxonList);
router.get('/editAnimalTaxon/:id',animal.editAnimalTaxon);

router.get('/bacteriaTaxon', auth.authenticate, (req,res,next)=>{
    res.render('admin/bacteriaTaxon');
});
router.post('/bacteriaTaxon',bacteria.addBacteriaTaxon);
router.post('/updateBacteriaTaxon/:id',bacteria.updateBacteriaTaxon);
router.get('/bacteriaTaxonList',bacteria.bacteriaTaxonList);
router.get('/editBacteriaTaxon/:id',bacteria.editBacteriaTaxon);

router.get('/animal', auth.authenticate, (req,res,next) =>{
    res.render('admin/animal');
});
router.post('/animal', upload.single("animalImg"), animal.addAnimal);
router.post('/editAnimal/:id', upload.single('animalImg'), animal.updateAnimal);
router.get('/animalList',animal.animalList);
router.get('/viewAnimal/:id',animal.viewAnimal);
router.get('/toSelectJournal',animal.toSelectJournal);

router.get('/bacteria', auth.authenticate, (req,res,next)=>{
    res.render('admin/bacteria');
});

router.post('/bacteria',bacteria.addBacteria);
router.post('/updateBacteria/:id',bacteria.updateBacteria);
router.get('/bacteriaList',bacteria.bacteriaList);
router.get('/toSelectBacteria',bacteria.toSelectBacteria);
router.get('/toSelectJournalBacteria',bacteria.toSelectJournalBacteria);
router.get('/viewBacteria/:id',bacteria.viewBacteria);
router.get('/editBacteria/:id',bacteria.viewBacteria);

router.get('/disease', auth.authenticate,(req,res,next)=>{
    res.render('admin/disease');
});
router.post('/disease',disease.addDisease);
router.get('/diseaseList',disease.diseaseList);
router.get('/toSelectBacteriaDisease',disease.toSelectBacteriaDisease);
router.get('/viewDisease/:id',disease.viewDisease);
router.get('/toSelectJournalDisease2',disease.toSelectJournalDisease);
router.post('/editDisease/:id',disease.editDisease);


router.get('/toxin', auth.authenticate, (req,res,next)=>{
    res.render('admin/toxin');
});
router.post('/toxin',bacteria.addToxin);
router.get('/toxinList',bacteria.toxinList);
router.get('/editToxin/:id',bacteria.editToxin);
router.post('/updateToxin/:id',bacteria.updateToxin);

router.get('/prevention', auth.authenticate, (req,res,next)=>{
    res.render('admin/prevention');
});
router.get('/toSelectDisease',prevention.toSelectDisease);
router.get('/preventionList',prevention.preventionList);
router.get('/viewPrevention/:id',prevention.viewPrevention);
router.get('/editPrevention/:id',prevention.viewPrevention);
router.post('/updatePrevention/:id',prevention.updatePrevention);
router.post('/addPrevention',prevention.addPrevention);

router.get('/notification',auth.authenticate,(req,res,next) =>{
    res.render('admin/notification');
});

router.get('/notificationList',notification.notificationList);
router.get('/notificationViewAnimalTaxo/:id',notification.viewAnimalTaxo);
router.get('/notificationViewBacteriaTaxo/:id',notification.viewBacteriaTaxo);
router.get('/notificationSelectBacteria',notification.selectBacteria);
router.get('/notificationViewToxin/:id',notification.viewToxin);
router.get('/notificationViewDisease/:id',notification.viewDisease);
router.get('/notificationSelectDisease',notification.selectDisease);
router.get('/notificationViewPrevention/:id',notification.viewPrevention);
router.get('/notificationViewAnimal/:id',notification.viewAnimal);
router.get('/notificationSelectAnimal',notification.selectAnimal);
router.get('/notificationViewBacteria/:id',notification.viewBacteria);

router.post('/approvedAnimalTaxo/:id',notification.approvedAnimalTaxo);
router.post('/rejectAnimalTaxo/:id',notification.rejectAnimalTaxo);
router.post('/approvedBacteriaTaxo/:id',notification.approvedBacteriaTaxo);
router.post('/rejectBacteriaTaxo/:id',notification.rejectBacteriaTaxo);
router.post('/approvedToxin/:id',notification.approvedToxin);
router.post('/rejectToxin/:id',notification.rejectToxin);
router.post('/notificationApprovedDisease/:id',notification.approvedDisease);
router.post('/rejectDisease/:id',notification.rejectDisease);
router.post('/notificationApprovedPrevention/:id',notification.approvedPrevention);
router.post('/rejectPrevention/:id',notification.rejectPrevention);
router.post('/approvedBacteria/:id',notification.approvedBacteria);
router.post('/rejectBacteria/:id',notification.rejectBacteria);
router.post('/approvedAnimal/:id',notification.approvedAnimal);
router.post('/rejectAnimal/:id',notification.rejectAnimal);

router.get('/journal',auth.authenticate,(req,res,next)=>{
    res.render('admin/journal');
});

router.get('/toSelectStaffName',journal.toSelectStaffName);
router.get('/toSelectJournal1',journal.toSelectJournal);
router.get('/journalList',journal.journalList);
router.get('/editJournal/:id',journal.editJournal);
router.get('/viewJournal/:id',journal.viewJournal);

router.post('/addJournal',upload.single('myfile'),journal.addJournal);
router.post('/updateJournal/:id',journal.updateJournal);
router.post('/assignedJournal',journal.assignedJournal);

router.get('/staffTable',auth.authenticate, (req,res,next)=>{
    res.render('admin/staff');
});

router.get('/staffList',staff.staffList);
router.post('/code',staff.code);
router.post('/updateTypeToAdmin/:id',staff.updateTypeToAdmin);
router.post('/updateTypeToContributor/:id',staff.updateTypeToContributor);

module.exports = router;