const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        let file_extension = file.mimetype.split('/')[1];
        if(file_extension == "jpeg" || file_extension == "jpg" || file_extension == "png"){
            cb(null,  __dirname +  "/public/image_upload");
        }
        else if(file_extension == "xlxs" || file_extension == "xlx" || file_extension == "xls"){
            cb(null,  __dirname +  "/public/data_upload");
        }
        else {
            cb(null,  __dirname +  "/public/others");
        }
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

let uploader = multer({storage: storage});
let middleware = {
    single: (inputname)=>{
        return (req, res, next)=>{
            let mid = uploader.single(inputname);
            // mid.
        }
    }
}

module.exports = /* middleware */ uploader;