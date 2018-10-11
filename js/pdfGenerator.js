const htmlPdf = require('html-pdf');
const ejs = require('ejs');

const fileDestination = './public/others';

exports.generatePDF = function(template, data, datatype, cb){
    if(typeof datatype == "function"){
        cb = datatype;
        datatype = "file";
    }
    createHTML(template, data, function(err, html){
        if(err) return cb(err);
        createPDF(html, datatype, function(err, pdf){
            if(err) return cb(err);
            cb(null, pdf);
        });
    });
}

function createPDF(html, method, cb){
    var pdf = htmlPdf.create(html);
    switch(method){
        case 'file' : {
            pdf.toFile(fileDestination, function(err, res){
                if(err) return cb(err);
                cb(null, res.filename);
            });
            break;
        }
        case 'buffer' : {
            pdf.toBuffer(function(err, buffer){
                if(err) return cb(err);
                cb(null, buffer);
            });
            break;
        }
        case 'stream' : {
            pdf.toStream(function(err, stream){
                if(err) return cb(err);
                cb(null, stream);
            });
            break;
        }
        default:{
            cb(new Error("Invalid Method"));
        }
    }
}

function createHTML(template, locals, cb){
    ejs.renderFile(template, locals, function(err, html){
        if(err) return cb(err);
        cb(null,html);
    });
}

/**
 * PDF Generator Module
 * created by: cprt
 * 
 * How to use:
 * 
 * - Import this module on top of file imports.
 * - Prepare your Data and Template to use.
 * - call generatePDF() and supply parameters.
 * - Parameters are:
 *      - template: String path to the ejs template
 *      - data: Data Object that ejs view engine would use to produce different results e.g: Unique table contents
 *      - datatype: either of this options: 'file', 'buffer', or 'stream' (this parameter is optional) 
 *      - cb: Callback function with Error: err and result depending on datatype.
 * 
 *  - Example:
 *      const pdf = require('pdfGenerator'); // change this depending on file tree structure
 *  
 *      ;et template = "./views/sample.ejs";
 *      let data = {
 *          header: "sample header",
 *          records: ["Leki","Paul","Ejs"]
 *      };
 * 
 *      pdf.generatePDF(template, data, 'file', function(err, filepath){
 *          if(err) return console.error(err);
 *          console.log(filepath);
 *      });
 */