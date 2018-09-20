const express = require('express');
const router = express.Router();

router.use('/',require("./controllers/admin/adminRoutes"));
router.use('/',require("./controllers/contributors/contriRoutes"));
router.use('/',require("./controllers/researcher/researcherRoutes"));

router.get('/test', (req, res, next)=>{
    let bacdive = require('./bacdive');
    if(!req.query.genus) return res.status(404).end();
    bacdive.searchSpecies(req.query.genus, function(err, data){
        if(err) return next(err);
        res.send(data);
    })
});

router.use((req,res)=>{
    let response;
    if(req.xhr){
        response = {success: false};
    }else{
        response = "<center><h1>404 Page Not Found</h1><br/><p>The page you been looking for must be remove</p></center>";
    }
    res.status(404).send(response);
});

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
