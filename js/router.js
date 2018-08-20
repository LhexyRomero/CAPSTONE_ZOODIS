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

const animalMid = require('./middleware/animalMid');
const bacteriaMid = require('./middleware/bacteriaMid');
const search = require('./middleware/searchMid');
const diseaseMid = require('./middleware/diseaseMid');
const preventionMid = require('./middleware/preventionMid');
const contri_animalMid = require('./contri_middleware/animalMid');
const contri_bacteriaMid = require('./contri_middleware/bacteriaMid');
const auth = require('./middleware/authentication');

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
router.post('/animalTaxon', animalMid.addAnimalTaxon);
router.post('/updateAnimalTaxon/:id',animalMid.updateAnimalTaxon);
router.get('/animalTaxonList',animalMid.animalTaxonList);
router.get('/editAnimalTaxon/:id',animalMid.editAnimalTaxon);

router.get('/bacteriaTaxon', auth.authenticate, (req,res,next)=>{
    res.render('bacteriaTaxon');
});
router.post('/bacteriaTaxon',bacteriaMid.addBacteriaTaxon);
router.post('/updateBacteriaTaxon/:id',bacteriaMid.updateBacteriaTaxon);
router.get('/bacteriaTaxonList',bacteriaMid.bacteriaTaxonList);
router.get('/editBacteriaTaxon/:id',bacteriaMid.editBacteriaTaxon);

router.get('/animal', auth.authenticate, (req,res,next) =>{
    res.render('animal');
});
router.post('/animal', upload.single("animalImg"), animalMid.addAnimal);
router.post('/editAnimal/:id', upload.single('animalImg'), animalMid.updateAnimal);
router.get('/animalList',animalMid.animalList);
router.get('/viewAnimal/:id',animalMid.viewAnimal);

router.get('/bacteria', auth.authenticate, (req,res,next)=>{
    res.render('bacteria');
});

router.post('/bacteria',bacteriaMid.addBacteria);
router.post('/updateBacteria/:id',bacteriaMid.updateBacteria);
router.get('/bacteriaList',bacteriaMid.bacteriaList);
router.get('/toSelectBacteria',bacteriaMid.toSelectBacteria);
router.get('/toSelectBacteria2',bacteriaMid.toSelectBacteria2);
router.get('/toModalSelect',bacteriaMid.toSelectBacteria2);
router.get('/viewBacteria/:id',bacteriaMid.viewBacteria);
router.get('/editBacteria/:id',bacteriaMid.viewBacteria);

router.get('/disease', auth.authenticate,(req,res,next)=>{
    res.render('disease');
});
router.post('/disease',diseaseMid.addDisease);
router.get('/diseaseList',diseaseMid.diseaseList);
router.get('/toSelectBacteriaDisease',diseaseMid.toSelectBacteriaDisease);
router.get('/viewDisease/:id',diseaseMid.viewDisease);
router.post('/editDisease/:id',diseaseMid.editDisease);

router.get('/toxin', auth.authenticate, (req,res,next)=>{
    res.render('toxin');
});
router.post('/toxin',bacteriaMid.addToxin);
router.get('/toxinList',bacteriaMid.toxinList);
router.get('/editToxin/:id',bacteriaMid.editToxin);
router.post('/updateToxin/:id',bacteriaMid.updateToxin);

router.get('/prevention', auth.authenticate, (req,res,next)=>{
    res.render('prevention');
});
router.get('/toSelectDisease',preventionMid.toSelectDisease);
router.get('/preventionList',preventionMid.preventionList);
router.get('/viewPrevention/:id',preventionMid.viewPrevention);
router.get('/editPrevention/:id',preventionMid.viewPrevention);
router.post('/updatePrevention/:id',preventionMid.updatePrevention);
router.post('/addPrevention',preventionMid.addPrevention);

router.get('/Zoonotic-Disease-Identification', auth.authenticate, (req,res,next)=> {
    res.render('index');
});

router.get('/contri_*', auth.authenticate, (req,res,next)=>{
    if(req.session.accType == 1) return next();
    res.redirect('/login');
}); 
//BELOW THIS ALL ROUTE NEEDS AUTHENTICATION

router.get('/contri_Animal',(req,res,next)=>{
    res.render('contri_Animal');
});

router.post('/contri_animal',upload.single("animalImg"),contri_animalMid.addAnimal);

router.get('/contri_animalTaxon',(req,res,next)=>{
    res.render('contri_AnimalTaxon');
});

router.post('/contri_animalTaxon',contri_animalMid.addAnimalTaxon);

router.get('/contri_animalTaxonList',contri_animalMid.animalTaxonList);
router.get('/contri_viewAnimalTaxon/:id',contri_animalMid.viewAnimalTaxon);
router.get('/contri_toSelectJournal',contri_animalMid.toSelectJournal);

router.get('/contri_Bacteria',(req,res,next)=>{
    res.render('contri_Bacteria');
});

router.post('/contri_bacteriaTaxon',contri_bacteriaMid.addBacteriaTaxon);
router.post('/contri_bacteria',contri_bacteriaMid.addBacteria);


router.get('/contri_bacteriaTaxonList',contri_bacteriaMid.bacteriaTaxonList);
router.get('/contri_viewBacteriaTaxon/:id',contri_bacteriaMid.viewBacteriaTaxon);
router.get('/contri_toSelectJournal1',contri_bacteriaMid.toSelectJournal);

router.get('/contri_BacteriaTaxon',(req,res,next)=>{
    res.render('contri_BacteriaTaxon');
});

router.get('/contri_Disease',(req,res,next)=>{
    res.render('contri_Disease');
});

router.get('/contri_DiseaseTable',(req,res,next)=>{
    res.render('contri_DiseaseTable');
});

router.get('/contri_HostTable',(req,res,next)=>{
    res.render('contri_HostTable');
});

router.get('/contri_Prevention',(req,res,next)=>{
    res.render('contri_Prevention');
});

router.get('/contri_Toxin',(req,res,next)=>{
    res.render('contri_Toxin');
});

router.post('/contri_toxin',contri_bacteriaMid.addToxin);

router.get('/contri_toSelectBacteria' , contri_bacteriaMid.toSelectBacteria);

router.get('/contri_Dashboard', auth.authenticate, (req,res,next)=>{
    res.render('contri_Dashboard');
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