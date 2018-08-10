const express = require('express');
const router = express.Router();

const animalMid = require('./middleware/animalMid'); //importing animal middleware 
const bacteriaMid = require('./middleware/bacteriaMid');
const search = require('./middleware/searchMid');

router.get('/login', (req,res,next)=>{
    res.render('login');
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

router.post('/animal',animalMid.addAnimal);
router.post('/animalTaxon', animalMid.addAnimalTaxon);
router.post('/updateAnimalTaxon/:id',animalMid.updateAnimalTaxon);

router.get('/animalTaxonList',animalMid.animalTaxonList);
router.get('/editAnimalTaxon/:id',animalMid.editAnimalTaxon);

router.get('/bacteria',(req,res,next)=>{
    res.render('bacteria');
});

router.post('/bacteriaTaxon',bacteriaMid.addBacteriaTaxon);
router.post('/updateBacteriaTaxon/:id',bacteriaMid.updateBacteriaTaxon);

router.get('/bacteriaTaxonList',bacteriaMid.bacteriaTaxonList);
router.get('/editBacteriaTaxon/:id',bacteriaMid.editBacteriaTaxon);


router.get('/disease', (req,res,next)=>{
    res.render('disease');
});

router.get('/toxin',(req,res,next)=>{
    res.render('toxin');
});

router.get('/prevention',(req,res,next)=>{
    res.render('prevention');
});

router.post('/toxin',bacteriaMid.addToxin);
router.get('/toxinList',bacteriaMid.toxinList);
router.get('/editToxin/:id',bacteriaMid.editToxin);
router.post('/updateToxin/:id',bacteriaMid.updateToxin);

router.get('/Zoonotic-Disease-Identification',(req,res)=> {
    res.render('index');
});

/**
 * Search Router, for searching taxonomy of animal and bacteria
 */
router.get('/search/animal', search.animal);

router.get('/search/bacteria', search.bacteria);

/**
 * 404 error handler
 */
router.use((req,res)=>{
    res.status(404).send();
});
/**
 * 500 error handler
 */
router.use((err,req,res,next)=>{
    console.error(err);
    res.status(500).send({success: false, detail: "Internal Server Error"});
});

module.exports = router;