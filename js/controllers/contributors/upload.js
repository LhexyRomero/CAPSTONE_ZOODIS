const db = require("../../connection");
var XLSX = require('xlsx');

exports.submitData =  async (req, res, next) => {
    let name = req.session.staffData.firstName + " " + req.session.staffData.lastName;
    let checkAnimal = function (data) {
        return new Promise(function (resolve, reject) {
            let sql = "SELECT animalID FROM animal_t  WHERE animalScientificName = ?";
            db.get().query(sql, [data.animal_scientific_name], (err, results) => {
                console.log('checkAnimal err', err);
                if (err) return reject(err);
                if (results.length == 0) {
                    return resolve(false);
                } else {
                    return resolve(results[0].animalID);
                }
            });
        });
    }

    let checkBacteria = function (data) {
        return new Promise(function (resolve, reject) {
            let sql = "SELECT bacteriumID FROM bacteria_t  WHERE bacteriumScientificName = ?";
            db.get().query(sql, [data.bacterial_name], (err, results) => {
                console.log('checkBacteria err', err);
                if (err) return reject(err);
                if (results.length == 0) {
                    return resolve(false);
                } else {
                    return resolve(results[0].bacteriumID);
                }
            });
        });
    }

    let insertAnimal = function (req, data) {
        return new Promise(function (resolve, reject) {
            let sql = "INSERT INTO animal_t (animalScientificName, animalName, journalID, staffID, dateTime, animalTaxoID, image, status) VALUES (?, ?, ?, ?, NOW(), 1, ?, 'approved')";
            db.get().query(sql, [data.animal_scientific_name, data.animal_common_name, data.journal_id, req.session.staffID, 'N/A'], (err, result) => {
                console.log('insertAnimal err', err);
                if (err) return reject(err);
                return resolve(result.insertId)
            });
        });
    }

    let insertAcBacteria = function (req, data, animal_id) {
        return new Promise(function (resolve, reject) {
            console.log('data', data);
            let sql = "INSERT INTO bacteria_t (bacteriumSpeciesName, bacteriumGenusName, bacteriumScientificName, bacteriumTissueSpecifity, bacteriumSampleType, bacteriumIsolation, bacteriumIdentification, pathogenic, count, bacteriumTaxoID, journalID, status, staffID, dateTime) VALUES (?, ?, ?, ?,?,?, ?, ?, ?, ?, ?, ?, ?, NOW())";
            db.get().query(sql, [data.species, data.genus, data.bacterial_name, 'N/A', 'N/A', 'N/A', 'N/A', 0,0,1, data.journal_id, 'approved', req.session.staffID  ], (err, result) => {
                console.log('insertAcBacteria err', err);
                if (err) return reject(err);
                return resolve(result.insertId)
            });
        });
    }

    let insertUserJournal = function (h_doi_number, req) {
        return new Promise(function (resolve, reject) {
            let sql = "INSERT INTO userjournal_t (jDoi, jState, staffID, jTitle, jPublished, jSubject, jMessage, jFile, jDateTime) VALUES (?, 0, ?, ?, ?, ?, ?, ?, NOW())";
            db.get().query(sql, [h_doi_number, req.session.staffID, 'Fileupload', 2019, 'Fileuploadsubject', 'mesg', 'jFile'], (err, result) => {
                console.log('insertUserJournal err', err);
                if (err) return reject(err);
                return resolve(result.insertId);
            });
        });
    }

    

    let insertRequest = function (req, h_animal_scientific_name, addedId) {
        return new Promise(function (resolve, reject) {
            let sql = `INSERT INTO request_t (dateTime, status, category, state, assignID, message,
                            staffName, 
                            staffID, 
                            addedData,
                            addedId
                            ) 
                    VALUES (NOW(), 'pending', 'Animal', 'noticed', 19, '',
                            ?, 
                            ?,
                            ?,
                            ?)`;
            db.get().query(sql, [
                req.session.staffData.firstName + " " + req.session.staffData.lastName, 
                req.session.staffID,
                h_animal_scientific_name,
                addedId
            ], (err, result) => {
                console.log('insertRequest err', err);
                if (err) return reject(err);
                return resolve(result.insertId)
            });
        });
    }
    console.log(req.body);
    console.log(JSON.parse(req.body['data'])[0])
    var all_data = JSON.parse(req.body['data'])
    var journal_id = await insertUserJournal(all_data[0].doi_number, req);
    console.log('journal_id', journal_id);

    all_data.forEach(async function(data) {
        data['journal_id'] = journal_id
        var animal_id = -1
        // console.log('animal_scientific_name', animal_scientific_name);
        if (data.animal_scientific_name != 'N/A') {

            var id = await checkAnimal(data);
            var bacterial_id = await checkBacteria(data)
                
            if (!id) {
                var animal_id_insert = await insertAnimal(req, data);
                await insertRequest(req, data.animal_scientific_name, animal_id_insert)
                console.log('insertAnimal result: ', animal_id_insert);
                animal_id = animal_id_insert;

                var acBacteria_id = -1;
                var bac_id = -1;
                if (!bacterial_id) {
                    acBacteria_id = await insertAcBacteria(req, data, animal_id);
                    bac_id = acBacteria_id;
                }
                
                console.log('animal_id', animal_id)
                console.log('bac_id', bac_id)
            } else {
                animal_id = id;
                var acBacteria_id = -1;
                var bac_id = -1;
                if (!bacterial_id) {
                    acBacteria_id = await insertAcBacteria(req, data, animal_id);
                    bac_id = acBacteria_id;
                }
                
                console.log('animal_id', animal_id)
                console.log('bac_id', bac_id)

            }

        }
    })
    res.status(200).send();
}

let getExcelData = function () {
    return new Promise(function (resolve, reject) {
        let sql = "SELECT * FROM exceldata_t";
        db.get().query(sql, (err, results) => {
            console.log('getExcelData err', err);
            if (err) return reject(err);
            if (results.length == 0) {
                return resolve(false);
            } else {
                return resolve(results);
            }
        });
    });
}

exports.getExcelData = (req, res, next) => {
    getExcelData().then(data => res.status(200).send(data));
}

exports.uploadData =  async (req, res, next) => {

    let insertExcelData = function (data) {
        return new Promise(function (resolve, reject) {
            let sql = `INSERT INTO exceldata_t (
                        journal_number,
                        doi_number,
                        journal_title,
                        bacterial_id_method,
                        country,
                        animal_specimen,
                        animal_common_name,
                        animal_scientific_name,
                        bacterial_name,
                        phylum,
                        clazz,
                        exceldata_t.order,
                        family,
                        genus,
                        species) 
                    VALUES (?, ?, ?, ?, ?, ?,
                            ?, ?, ?, ?, ?, ?, 
                            ?, ?, ?)`;
            db.get().query(sql, [
                data.journal_number,
                data.doi_number,
                data.journal_title,
                data.bacterial_id_method,
                data.country,
                data.animal_specimen,
                data.animal_common_name,
                data.animal_scientific_name,
                data.bacterial_name,
                data.phylum,
                data.clazz,
                data.order,
                data.family,
                data.genus,
                data.species
            ], (err, result) => {
                console.log('inserExcelData err', err);
                if (err) return reject(err);
                return resolve(result)
            });
        });
    }

    if (!req.file) {
        res.status(200).send({ success: false, error: 1, detail: "No Image Provided!" });
        return;
    }

    let body = req.body;
    let journal_file_path = req.file.path;

   
    var workbook = XLSX.readFile(journal_file_path);
    var sheet_name_list = workbook.SheetNames;
    var worksheet = workbook.Sheets['DASHBOARD'];
    var headers_detail = {};
    var header_name = [];
    var row_data = [];
   

    var start = 2;
    var rows = ['A', 'C', 'E', 'F', 'G', 'H', 'I', 'J', 'R', 'S', 'T', 'U', 'V', 'W', 'X']

    while (true) {
        if (!worksheet['A' + start]) {
            console.log('end at ' + 'A' + start)
            break;
        }
        var journal_number;
        var doi_number;
        var journal_title;
        var bacterial_id_method;
        var country;
        var animal_specimen;
        var animal_common_name;
        var animal_scientific_name;
        var bacterial_name;
        var phylum;
        var clazz;
        var order;
        var family;
        var genus;
        var species;
        for (r in rows) {
            position = rows[r] + start
            console.log(position)
            if (worksheet[position]) {
                //check also if value is N/A
                console.log('[' + position + ']' + worksheet[position].v)

                if (rows[r] == 'A') {
                    journal_number = worksheet[position].v;
                }
                if (rows[r] == 'C') {
                    doi_number = worksheet[position].v;
                }
                if (rows[r] == 'E') {
                    journal_title = worksheet[position].v;
                }
                if (rows[r] == 'F') {
                    bacterial_id_method = worksheet[position].v;
                }
                if (rows[r] == 'G') {
                    country = worksheet[position].v;
                }
                if (rows[r] == 'H') {
                    animal_specimen = worksheet[position].v;
                }
                if (rows[r] == 'I') {
                    animal_common_name = worksheet[position].v;
                }
                if (rows[r] == 'J') {
                    animal_scientific_name = worksheet[position].v;
                }
                if (rows[r] == 'R') {
                    bacterial_name = worksheet[position].v;
                }
                if (rows[r] == 'S') {
                    phylum = worksheet[position].v;
                }
                if (rows[r] == 'T') {
                    clazz = worksheet[position].v;
                }
                if (rows[r] == 'U') {
                    order = worksheet[position].v;
                }
                if (rows[r] == 'V') {
                    family = worksheet[position].v;
                }
                if (rows[r] == 'W') {
                    genus = worksheet[position].v;
                }
                if (rows[r] == 'X') {
                    species = worksheet[position].v;
                }

            }
            
        }

        var data = {
            'journal_number': (journal_number) ? journal_number : '',
            'doi_number': (doi_number) ? doi_number : '',
            'journal_title': (journal_title) ? journal_title : '',
            'bacterial_id_method': (bacterial_id_method) ? bacterial_id_method : '',
            'country': (country) ? country : '',
            'animal_specimen': (animal_specimen) ? animal_specimen : '',
            'animal_common_name': (animal_common_name) ? animal_common_name : '',
            'animal_scientific_name': (animal_scientific_name) ? animal_scientific_name : '',
            'bacterial_name': (bacterial_name) ? bacterial_name : '',
            'phylum': (phylum) ? phylum : '',
            'clazz': (clazz) ? clazz : '',
            'order': (order) ? order : '',
            'family': (family) ? family : '',
            'genus': (genus) ? genus : '',
            'species': (species) ? species : '',
        }

        insertExcelData(data);

        start = start + 1;
    }

    getExcelData().then(excelData => res.status(200).send(excelData));
}
