exports.addDisease = (req,res,next) =>{

    let data = req.body;
    let diseaseName = data.strDiseaseName;
    let diseaseDesc = data.strDiseaseDesc;
    let symptoms = [data.symptoms0, '\n', ]
}