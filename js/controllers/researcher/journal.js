const db = require('../../connection');
const pdfReader = require('pdfreader').PdfReader;
var XLSX = require('xlsx');

exports.uploadJournal = async (req, res, next) => {
    
    let file = req.file.path;
    
    if (!req.file) {
        res.status(200).send({ success: false, detail: "No Journal Provided!" });
        return;
    }

    let name = req.body.name;
    let subject = req.body.subject;
    let message = req.body.message;
    let body = req.body;
    let journal_file_path = req.file.path;

    
    let full_name = req.session.staffData.firstName + " " + req.session.staffData.lastName;
    console.log('name', name);
    console.log('body', body);
    console.log('journal_file_path', journal_file_path);
    console.log('req.session.staffData', req.session.staffData);

    var workbook = XLSX.readFile(journal_file_path);
    var sheet_name_list = workbook.SheetNames;
    var worksheet = workbook.Sheets['DASHBOARD'];
    var headers_detail = {};
    var header_name = [];
    var row_data = [];

    var h_bjournal_number = worksheet['B2'].v;
    var h_doi_number = worksheet['B3'].v
    var h_id_method = worksheet['B4'].v
    var h_animal_common_name = worksheet['B5'].v
    var h_animal_scientific_name = worksheet['B6'].v
    var h_animal_specimen = worksheet['B7'].v
    var h_country = worksheet['B8'].v
    console.log('Basilio Journal Number:', h_bjournal_number);
    console.log('DOI Number:', h_doi_number);
    console.log('ID Method:', h_id_method);
    console.log('common name:', h_animal_common_name);
    console.log('scientific name:', h_animal_scientific_name);
    console.log('animal specimen:', h_animal_specimen);
    console.log('country:', h_country);


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

    let insertAnimal = function (req, data) {
        return new Promise(function (resolve, reject) {
            let sql = "INSERT INTO animal_t (animalScientificName, animalName, journalID, staffID, dateTime, animalTaxoID, image, status) VALUES (?, ?, ?, ?, NOW(), 1, ?, 'pending')";
            db.get().query(sql, [data.animal_scientific_name, data.animal_common_name, data.journal_id, req.session.staffID, 'N/A'], (err, result) => {
                console.log('insertAnimal err', err);
                if (err) return reject(err);
                return resolve(result.insertId)
            });
        });
    }

    let insertAcBacteria = function (req, data) {
        return new Promise(function (resolve, reject) {
            console.log('data', data);
            let sql = "INSERT INTO ac_bacteria_t (phylum, class, orderr, family, genus, species) VALUES (?, ?, ?, ?, ?, ?)";
            db.get().query(sql, [data.phylum, data.clazz, data.order, data.family, data.genus, data.species], (err, result) => {
                console.log('insertAcBacteria err', err);
                if (err) return reject(err);
                return resolve(result.insertId)
            });
        });
    }

    let insertUserJournal = function (h_doi_number, req, name, message, subject, journal_file_path) {
        return new Promise(function (resolve, reject) {
            let sql = "INSERT INTO userjournal_t (jDoi, jState, staffID, jTitle, jPublished, jSubject, jMessage, jFile, jDateTime) VALUES (?, 0, ?, ?, ?, ?, ?, ?, NOW())";
            db.get().query(sql, [h_doi_number, req.session.staffID, name, 2019, subject, message, 'jFile'], (err, result) => {
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
    

    var journal_id = await insertUserJournal(h_doi_number, req, name, message, subject, journal_file_path);
    console.log('journal_id', journal_id);

    var start = 11;
    var rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O']

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
                if (rows[r] == 'B') {
                    doi_number = worksheet[position].v;
                }
                if (rows[r] == 'C') {
                    journal_title = worksheet[position].v;
                }
                if (rows[r] == 'D') {
                    bacterial_id_method = worksheet[position].v;
                }
                if (rows[r] == 'E') {
                    country = worksheet[position].v;
                }
                if (rows[r] == 'F') {
                    animal_specimen = worksheet[position].v;
                }
                if (rows[r] == 'G') {
                    animal_common_name = worksheet[position].v;
                }
                if (rows[r] == 'H') {
                    animal_scientific_name = worksheet[position].v;
                }
                if (rows[r] == 'I') {
                    bacterial_name = worksheet[position].v;
                }
                if (rows[r] == 'J') {
                    phylum = worksheet[position].v;
                }
                if (rows[r] == 'K') {
                    clazz = worksheet[position].v;
                }
                if (rows[r] == 'L') {
                    order = worksheet[position].v;
                }
                if (rows[r] == 'M') {
                    family = worksheet[position].v;
                }
                if (rows[r] == 'N') {
                    genus = worksheet[position].v;
                }
                if (rows[r] == 'O') {
                    species = worksheet[position].v;
                }

            }
        }

        var data = {
            'journal_id': (journal_id) ? journal_id : '',
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


        var animal_id = -1
        // console.log('animal_scientific_name', animal_scientific_name);
        if (animal_scientific_name != 'N/A') {

            var id = await checkAnimal(data);
            if (!id) {
                var animal_id_insert = await insertAnimal(req, data);
                await insertRequest(req, data.animal_scientific_name, animal_id_insert)
                console.log('insertAnimal result: ', animal_id_insert);
                animal_id = animal_id_insert;
                var acBacteria_id = await insertAcBacteria(req, data);
                var bac_id = acBacteria_id;
                console.log('animal_id', animal_id)
                console.log('bac_id', bac_id)
            } else {
                animal_id = id;
                var acBacteria_id = await insertAcBacteria(req, data);
                var bac_id = acBacteria_id;
                console.log('animal_id', animal_id)
                console.log('bac_id', bac_id)

            }

        }
        start = start + 1;
    }

    res.status(200).send();
    //journal_number = 0
    //doi_number = 1
    //journal_title = 2
    //identification_method = 3
    //country = 4
    //animal_specimen = 5
    //animal_common_name = 6
    //animal_scientific_name = 7
    //Bacterial_name = 8
    //phylum = 9
    //class = 10
    //order = 11
    //family = 12
    //genus = 13
    //species = 14
}