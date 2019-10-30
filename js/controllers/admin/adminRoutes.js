
const express = require('express');
const router = express.Router();

const upload = require('../../fileUpload');

const auth = require('../authentication');
const animal = require('../admin/animal');
const bacteria = require('../admin/bacteria');
const search = require('../admin/search');
const disease = require('../admin/disease');
const prevention = require('../admin/prevention');
const request = require('../admin/request');
const journal = require('../admin/journal');
const reject = require('../admin/reject');
const staff = require('../admin/staff');
const profile = require('../admin/profile');
const sample = require('../admin/sample');
const message = require('../admin/message');
const notification = require('../admin/notification');
const query = require('../admin/query');
const reports = require('../admin/reports');


router.use((req,res,next)=>{ //Add initial middleware to ensure all request below will have staffData(if there is)
    res.locals.staffData = req.session.staffData;
    next();
});

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
router.get('/search/bacteriaSpeciesTaxo',search.bacteriaSpeciesTaxo);
router.get('/search/bacteriaSpeciesTaxoData',search.bacteriaSpeciesTaxoData);

router.get('/notification', auth.authenticate,(req,res,next)=>{
    res.render('admin/notification');
});

router.get('/notificationCard', notification.notificationCard);
router.get('/notificationDetails/:journalID/:staffID',notification.notificationDetails);
router.post('/completeUpdate/:id/:staff',notification.completeUpdate);
router.post('/sendUpdate/:id/:owner',notification.sendUpdate);
router.post('/incompleteUpdate/:id',notification.incompleteUpdate);


router.get('/dashboard',auth.authenticate,(req,res,next)=>{
    res.render('admin/dashboard');
});

router.get('/message',auth.authenticate,(req,res,next)=>{
    res.render('admin/message');
});

router.get('/messageNumber',message.messageNumber);
router.get('/messageDetails',auth.authenticate, message.messageDetail);
router.get('/messageList',message.messageList);
router.post('/send',message.send);
router.post('/adminSend',message.adminSend);

router.get('/sampleAlgo',auth.authenticate,(req,res,next)=>{
    res.render('admin/sampleAlgo');
});

router.post('/sample',sample.sample);

router.get('/user',auth.authenticate,(req,res,next)=>{
    res.render('admin/user');
});

router.get('/upload',auth.authenticate,(req,res,next)=>{
    res.render('admin/upload');
});

router.get('/viewProfile',profile.viewProfile);
router.post('/updateProfile',profile.updateProfile);

router.get('/hostTable', auth.authenticate,(req,res,next)=>{
    res.render('admin/hostTable');
});

router.get('/diseaseTable', auth.authenticate,(req,res,next)=>{
    res.render('admin/diseaseTable');
});

router.get('/rejectTable', auth.authenticate,(req,res,next)=>{
    res.render('admin/rejectTable');
});

router.get('/rejectList',reject.rejectList);

router.get('/animalTaxon', auth.authenticate, (req,res,next)=>{
    res.render('admin/animalTaxon');
});
router.post('/animalTaxon', animal.addAnimalTaxon);
router.post('/updateAnimalTaxon/:id',animal.updateAnimalTaxon);
router.get('/animalTaxonList',animal.animalTaxonList);
router.get('/editAnimalTaxon/:id',animal.editAnimalTaxon);

// router.get('/reports', auth.authenticate, (req,res,next)=>{
//     res.render('admin/reports');
// }); 

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

router.post('/bacteria', upload.single("animalImg"), bacteria.addBacteria);
router.post('/updateBacteria/:id',bacteria.updateBacteria);
router.post('/bacteriaHost',bacteria.bacteriaHost);
router.post('/deleteHostField/:bacteriumID/:hostID',bacteria.deleteHostField);
router.get('/bacteriaList',bacteria.bacteriaList);
router.get('/toSelectBacteria',bacteria.toSelectBacteria);
router.get('/toSelectBacteria2',bacteria.toSelectBacteria2);
router.get('/toSelectBacteria3',bacteria.toSelectBacteria3);
router.get('/toSelectJournalBacteria',bacteria.toSelectJournalBacteria);
router.get('/viewBacteria/:id',bacteria.viewBacteria);
router.get('/editBacteria/:id',bacteria.viewBacteria);
router.get('/toSelectAnimal',bacteria.toSelectAnimal);

router.get('/upload',auth.authenticate,(req,res,next)=>{
    res.render('admin/upload');
});

router.get('/disease', auth.authenticate,(req,res,next)=>{
    res.render('admin/disease');
});
router.post('/disease',disease.addDisease);
router.get('/diseaseList',disease.diseaseList);
router.get('/viewDisease/:id',disease.viewDisease);
router.get('/toSelectJournalDisease2',disease.toSelectJournalDisease);
router.post('/editDisease/:id',disease.editDisease);


router.get('/toxin', auth.authenticate, (req,res,next)=>{
    res.render('admin/toxin');
});
router.post('/carrier', bacteria.addCarrier);
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

router.get('/request',auth.authenticate,(req,res,next) =>{
    res.render('admin/request');
});

router.get('/requestNumber',request.requestNumber);
router.get('/requestList',request.requestList);
router.get('/requestViewAnimalTaxo/:id',request.viewAnimalTaxo);
router.get('/requestViewBacteriaTaxo/:id',request.viewBacteriaTaxo);
router.get('/requestSelectBacteria',request.selectBacteria);
router.get('/requestViewToxin/:id',request.viewToxin);
router.get('/requestViewDisease/:id',request.viewDisease);
router.get('/requestSelectDisease',request.selectDisease);
router.get('/requestViewPrevention/:id',request.viewPrevention);
router.get('/requestViewAnimal/:id',request.viewAnimal);
router.get('/requestSelectAnimal',request.selectAnimal);
router.get('/requestViewBacteria/:id',request.viewBacteria);

router.post('/removeHost/:bacteriumID/:hostID',request.removeHost);
router.post('/approvedAnimalTaxo/:id',request.approvedAnimalTaxo);
router.post('/rejectAnimalTaxo/:id',request.rejectAnimalTaxo);
router.post('/approvedBacteriaTaxo/:id',request.approvedBacteriaTaxo);
router.post('/rejectBacteriaTaxo/:id',request.rejectBacteriaTaxo);
router.post('/approvedToxin/:id',request.approvedToxin);
router.post('/rejectToxin/:id',request.rejectToxin);
router.post('/requestApprovedDisease/:id',request.approvedDisease);
router.post('/rejectDisease/:id',request.rejectDisease);
router.post('/requestApprovedPrevention/:id',request.approvedPrevention);
router.post('/rejectPrevention/:id',request.rejectPrevention);
router.post('/approvedBacteria/:id',request.approvedBacteria);
router.post('/rejectBacteria/:id',request.rejectBacteria);
router.post('/approvedAnimal/:id',request.approvedAnimal);
router.post('/rejectAnimal/:id',request.rejectAnimal);

router.get('/journal',auth.authenticate,(req,res,next)=>{
    res.render('admin/journal');
});

router.get('/toSelectStaffName',journal.toSelectStaffName);
router.get('/toSelectJournal1',journal.toSelectJournal);
router.get('/journalList',journal.journalList);
router.get('/editJournal/:id',journal.editJournal);
router.get('/viewJournal/:id',journal.viewJournal);
router.get('/journalAssignee',journal.journalAssignee);

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
router.post('/activateStatus/:id',staff.activateStatus);
router.post('/deactivateStatus/:id',staff.deactivateStatus);

router.get('/totalAnimal',query.totalAnimal);
router.get('/totalDisease',query.totalDisease);
router.get('/totalPrevention',query.totalPrevention);
router.get('/totalJournal',query.totalJournal);
router.get('/totalApproved',query.totalApproved);
router.get('/totalReject',query.totalReject);
router.get('/totalCollaborators',query.totalCollaborators);
router.get('/completeJournal',query.completeJournal);
router.get('/totalToxins',query.totalToxins);
router.get('/totalPotent',query.totalPotent);
router.get('/totalPatho',query.totalPatho);

router.get('/reports',reports.generateReports);

module.exports = router;