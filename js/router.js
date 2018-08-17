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

const animalMid = require('./middleware/animalMid'); //importing animal middleware 
const bacteriaMid = require('./middleware/bacteriaMid');
const search = require('./middleware/searchMid');
const diseaseMid = require('./middleware/diseaseMid');
const preventionMid = require('./middleware/preventionMid');

router.get('/login', (req,res,next)=>{
    res.render('login');
});

router.get('/register',(req,res,next)=>{
    res.render('register');
});

router.get('/dashboard',(req,res,next)=>{
    res.render('dashboard');
});

router.get('/user',(req,res,next)=>{
    res.render('user');
});

router.get('/tables',(req,res,next)=>{
    res.render('tables'); 
});

router.get('/hostTable',(req,res,next)=>{
    res.render('hostTable');
});

router.get('/diseaseTable',(req,res,next)=>{
    res.render('diseaseTable');
});

router.get('/animalTaxon',(req,res,next)=>{
    res.render('animalTaxon');
});

router.get('/bacteriaTaxon',(req,res,next)=>{
    res.render('bacteriaTaxon');
});

router.get('/animal',(req,res,next) =>{
    res.render('animal');
});

router.post('/animal', upload.single("animalImg"), animalMid.addAnimal);
router.post('/animalTaxon', animalMid.addAnimalTaxon);
router.post('/updateAnimalTaxon/:id',animalMid.updateAnimalTaxon);

router.get('/animalList',animalMid.animalList);
router.get('/animalTaxonList',animalMid.animalTaxonList);
router.get('/editAnimalTaxon/:id',animalMid.editAnimalTaxon);
router.get('/viewAnimal/:id',animalMid.viewAnimal);
router.post('/editAnimal/:id', upload.single('animalImg'), animalMid.updateAnimal);

router.get('/bacteria',(req,res,next)=>{
    res.render('bacteria');
});

router.post('/bacteria',bacteriaMid.addBacteria);
router.post('/bacteriaTaxon',bacteriaMid.addBacteriaTaxon);
router.post('/updateBacteriaTaxon/:id',bacteriaMid.updateBacteriaTaxon);
router.post('/updateBacteria/:id',bacteriaMid.updateBacteria);

router.get('/bacteriaList',bacteriaMid.bacteriaList);
router.get('/bacteriaTaxonList',bacteriaMid.bacteriaTaxonList);
router.get('/editBacteriaTaxon/:id',bacteriaMid.editBacteriaTaxon);
router.get('/toSelectBacteria',bacteriaMid.toSelectBacteria);
router.get('/toSelectBacteria2',bacteriaMid.toSelectBacteria2);
router.get('/toModalSelect',bacteriaMid.toSelectBacteria2);
router.get('/viewBacteria/:id',bacteriaMid.viewBacteria);
router.get('/editBacteria/:id',bacteriaMid.viewBacteria);


router.get('/disease', (req,res,next)=>{
    res.render('disease');
});

router.post('/disease',diseaseMid.addDisease);
router.get('/diseaseList',diseaseMid.diseaseList);
router.get('/toSelectBacteriaDisease',diseaseMid.toSelectBacteriaDisease);
router.get('/viewDisease/:id',diseaseMid.viewDisease);
router.post('/editDisease/:id',diseaseMid.editDisease);

router.get('/toxin',(req,res,next)=>{
    res.render('toxin');
});

router.get('/prevention',(req,res,next)=>{
    res.render('prevention');
});

router.get('/toSelectDisease',preventionMid.toSelectDisease);
router.get('/preventionList',preventionMid.preventionList);
router.get('/viewPrevention/:id',preventionMid.viewPrevention);
router.get('/editPrevention/:id',preventionMid.viewPrevention);
router.post('/updatePrevention/:id',preventionMid.updatePrevention);
router.post('/addPrevention',preventionMid.addPrevention);

router.post('/toxin',bacteriaMid.addToxin);
router.get('/toxinList',bacteriaMid.toxinList);
router.get('/editToxin/:id',bacteriaMid.editToxin);
router.post('/updateToxin/:id',bacteriaMid.updateToxin);

router.get('/', (req,res)=>{
    res.redirect('/dashboard');
});

router.get('/Zoonotic-Disease-Identification',(req,res)=> {
    res.render('index');
});

/**
 * Search Router, for searching taxonomy of animal and bacteria
 */
router.get('/search/animal', search.animal);
router.get('/search/bacteriaGenus',search.bacteriaGenus);
router.get('/search/bacteriaSpecies',search.bacteriaSpecies);

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
    res.status(500).send(response);
});

module.exports = router;