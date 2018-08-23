const express = require('express');
const router = express.Router();

const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, "public/image_upload");
    },
    filename: (req, file, cb)=>{
        let generateToken = function(size){
            var d = new Date().getTime();
            if (typeof performance !== 'undefined' && typeof performance.now === 'function'){
                d += performance.now(); //use high-precision timer if available
            }
            return (new Array(size).fill("x").join("")).replace(/[xy]/g, function (c) {
                var r = (d + Math.random() * 16) % 16 | 0;
                d = Math.floor(d / 16);
                return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
            });
        };
        cb(null, generateToken(15)+"."+file.mimetype.split("/")[1]);  
    }
});
const upload = multer({storage: storage});

const auth = require('./controllers/authentication');
const animal = require('./controllers/admin/animal');
const bacteria = require('./controllers/admin/bacteria');
const search = require('./controllers/admin/search');
const disease = require('./controllers/admin/disease');
const prevention = require('./controllers/admin/prevention');
const notification = require('./controllers/admin/notification');
const journal = require('./controllers/admin/journal');

const contri_animal = require('./controllers/contributors/animal');
const contri_bacteria = require('./controllers/contributors/bacteria');
const contri_disease = require('./controllers/contributors/disease');
const contri_prevention = require('./controllers/contributors/prevention');

router.get('/', (_,res,__)=>{
    res.redirect('/dashboard');
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
    res.render('dashboard');
});

router.get('/user',(req,res,next)=>{
    res.render('user');
});

router.get('/hostTable', auth.authenticate,(req,res,next)=>{
    res.render('hostTable');
});

router.get('/diseaseTable', auth.authenticate,(req,res,next)=>{
    res.render('diseaseTable');
});

router.get('/animalTaxon', auth.authenticate, (req,res,next)=>{
    res.render('animalTaxon');
});
router.post('/animalTaxon', animal.addAnimalTaxon);
router.post('/updateAnimalTaxon/:id',animal.updateAnimalTaxon);
router.get('/animalTaxonList',animal.animalTaxonList);
router.get('/editAnimalTaxon/:id',animal.editAnimalTaxon);

router.get('/bacteriaTaxon', auth.authenticate, (req,res,next)=>{
    res.render('bacteriaTaxon');
});
router.post('/bacteriaTaxon',bacteria.addBacteriaTaxon);
router.post('/updateBacteriaTaxon/:id',bacteria.updateBacteriaTaxon);
router.get('/bacteriaTaxonList',bacteria.bacteriaTaxonList);
router.get('/editBacteriaTaxon/:id',bacteria.editBacteriaTaxon);

router.get('/animal', auth.authenticate, (req,res,next) =>{
    res.render('animal');
});
router.post('/animal', upload.single("animalImg"), animal.addAnimal);
router.post('/editAnimal/:id', upload.single('animalImg'), animal.updateAnimal);
router.get('/animalList',animal.animalList);
router.get('/viewAnimal/:id',animal.viewAnimal);
router.get('/toSelectJournal',animal.toSelectJournal);

router.get('/bacteria', auth.authenticate, (req,res,next)=>{
    res.render('bacteria');
});

router.post('/bacteria',bacteria.addBacteria);
router.post('/updateBacteria/:id',bacteria.updateBacteria);
router.get('/bacteriaList',bacteria.bacteriaList);
router.get('/toSelectBacteria',bacteria.toSelectBacteria);
router.get('/toSelectBacteria2',bacteria.toSelectBacteria2);
router.get('/toSelectJournalBacteria',bacteria.toSelectJournalBacteria);
router.get('/toModalSelect',bacteria.toSelectBacteria2);
router.get('/viewBacteria/:id',bacteria.viewBacteria);
router.get('/editBacteria/:id',bacteria.viewBacteria);

router.get('/disease', auth.authenticate,(req,res,next)=>{
    res.render('disease');
});
router.post('/disease',disease.addDisease);
router.get('/diseaseList',disease.diseaseList);
router.get('/toSelectBacteriaDisease',disease.toSelectBacteriaDisease);
router.get('/viewDisease/:id',disease.viewDisease);
router.get('/toSelectJournalDisease2',disease.toSelectJournalDisease);
router.post('/editDisease/:id',disease.editDisease);


router.get('/toxin', auth.authenticate, (req,res,next)=>{
    res.render('toxin');
});
router.post('/toxin',bacteria.addToxin);
router.get('/toxinList',bacteria.toxinList);
router.get('/editToxin/:id',bacteria.editToxin);
router.post('/updateToxin/:id',bacteria.updateToxin);

router.get('/prevention', auth.authenticate, (req,res,next)=>{
    res.render('prevention');
});
router.get('/toSelectDisease',prevention.toSelectDisease);
router.get('/preventionList',prevention.preventionList);
router.get('/viewPrevention/:id',prevention.viewPrevention);
router.get('/editPrevention/:id',prevention.viewPrevention);
router.post('/updatePrevention/:id',prevention.updatePrevention);
router.post('/addPrevention',prevention.addPrevention);

router.get('/notification',auth.authenticate,(req,res,next) =>{
    res.render('notification');
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
    res.render('journal');
});

router.get('/journalList',journal.journalList);
router.post('/addJournal',journal.addJournal);

router.get('/', (req,res)=>{
    res.redirect('/dashboard');
});

router.get('/Zoonotic-Disease-Identification', auth.authenticate,(req,res,next)=> {
    res.render('index');
});

router.get('/contri_*', auth.authenticate, (req,res,next)=>{
    if(req.session.accType == 1) return next();
    res.redirect('/login');
}); 
//BELOW THIS ALL ROUTE NEEDS AUTHENTICATION

router.get('/contri_Animal',auth.authenticate,(req,res,next)=>{
    res.render('contri_Animal');
});

router.post('/contri_animal',upload.single("contri_animalImg"),contri_animal.addAnimal);

router.get('/contri_viewAnimal/:id',contri_animal.viewAnimal);
router.get('/contri_animalList',contri_animal.animalList);

router.get('/contri_animalTaxon',auth.authenticate,(req,res,next)=>{
    res.render('contri_AnimalTaxon');
});

router.post('/contri_animalTaxon',contri_animal.addAnimalTaxon);

router.get('/contri_animalTaxonList',contri_animal.animalTaxonList);
router.get('/contri_viewAnimalTaxon/:id',contri_animal.viewAnimalTaxon);
router.get('/contri_toSelectJournal',contri_animal.toSelectJournal);

router.get('/contri_Bacteria',auth.authenticate,(req,res,next)=>{
    res.render('contri_Bacteria');
});

router.post('/contri_bacteriaTaxon',contri_bacteria.addBacteriaTaxon);
router.post('/contri_bacteria',contri_bacteria.addBacteria);

router.get('/contri_bacteriaList',contri_bacteria.bacteriaList);
router.get('/contri_bacteriaTaxonList',contri_bacteria.bacteriaTaxonList);
router.get('/contri_viewBacteriaTaxon/:id',contri_bacteria.viewBacteriaTaxon);
router.get('/contri_toSelectJournal1',contri_bacteria.toSelectJournal);
router.get('/contri_toSelectAnimal',contri_bacteria.toSelectAnimal);
router.get('/contri_viewBacteria/:id',contri_bacteria.viewBacteria);

router.get('/contri_BacteriaTaxon',auth.authenticate,(req,res,next)=>{
    res.render('contri_BacteriaTaxon');
});

router.get('/contri_Disease',auth.authenticate,(req,res,next)=>{
    res.render('contri_Disease');
});

router.post('/contri_disease',contri_disease.addDisease);
router.get('/contri_toSelectBacteriaDisease',contri_disease.toSelectBacteriaDisease);
router.get('/contri_toSelectJournalDisease',contri_disease.toSelectJournalDisease);
router.get('/contri_diseaseList',contri_disease.diseaseList);
router.get('/contri_viewDisease/:id',contri_disease.viewDisease);

router.get('/contri_Prevention',auth.authenticate,(req,res,next)=>{
    res.render('contri_Prevention');
});

router.post('/contri_addPrevention',contri_prevention.addPrevention);
router.get('/contri_toSelectDisease',contri_prevention.toSelectDisease);
router.get('/contri_preventionList',contri_prevention.preventionList);

router.get('/contri_Toxin',auth.authenticate,(req,res,next)=>{
    res.render('contri_Toxin');
});

router.post('/contri_toxin',auth.authenticate,contri_bacteria.addToxin);

router.get('/contri_toSelectBacteria' , contri_bacteria.toSelectBacteria);
router.get('/contri_viewToxin/:id',contri_bacteria.viewToxin);

router.get('/contri_Dashboard', auth.authenticate, (req,res,next)=>{
    res.render('contri_Dashboard');
});

router.get('/contri_Notification', auth.authenticate, (req,res,next)=>{
    res.render('contri_Notification');
});

/**
 * 404 error handler
 */
router.use((req,res)=>{
    let response;
    if(req.xhr){
        response = {success: false};
    }else{
        response = "<center><h1>404 Page Not Found</h1><br/><p>The page you been looking for must be remove</p></center>";
    }
    res.status(404).send(response);
});
/**
 * 500 error handler
 */
router.use((err,req,res,next)=>{
    console.error(err);
    let response;
    if(req.xhr){
        response = {success: false};
    }else{
        response = "<center><h1>Error: 500</h1><br/><p>Internal Server Error. We'll fix it soon. ;)</p></center>";
    }
    if(!res.headerSent) res.status(500).send(response);
});

module.exports = router;
