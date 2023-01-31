const path=require('path');
const multer=require('multer');
const database=require('better-sqlite3')

function uploadImages() {
    const storage=multer.diskStorage({
        destination:function(req,file,cb) {
            cb(null,process.env.IMG_STORAGE)
        },
        filename:function(req,file,cb) {
            cb(null, Date.now() + path.extname(file.originalname));
        }       
    })
    return multer({storage:storage});
}

//function runDatabase() {
//      return new database(process.env.DB_PATH,{verbose:console.log})
//}

