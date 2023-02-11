const path=require('path');
const multer=require('multer');
const database=require('better-sqlite3');
const { default:DIContainer,object,use,factory} = require('rsdi');
const {carsController,carsService,carsRepository}= require('../module/cars/carsModule.js');
const {usersController}= require('../module/users/usersModule.js')

function runDatabase() {
      return new database('./data/sqliteDatabase.db',{verbose:console.log})
}



function uploadImages() {
    const storage=multer.diskStorage({
        destination:function(req,file,cb) {
            cb(null,/*process.env.IMG_STORAGE*/"public/uploads")
        },
        filename:function(req,file,cb) {
            cb(null, Date.now() + path.extname(file.originalname));
        }       
    })
    return multer({storage:storage});
}

function addCommonDefinitions(container) {
    container.add({
        runDatabase:factory(runDatabase),
        uploadImages:factory(uploadImages)
    })
}

function addCarsDefinitions(container) {
    container.add({
        carsController:object(carsController).construct(use('carsService'),use('uploadImages')),
        carsService:object(carsService).construct(use('carsRepository')),
        carsRepository:object(carsRepository).construct(use('runDatabase'))
    })
}

function addUsersDefinitions(container) {
    container.add({
        usersController:object(usersController).construct(use('uploadImages'))
    })
}

module.exports= function configureDI() {
    const container=new DIContainer();
    addCommonDefinitions(container);
    addCarsDefinitions(container);
    addUsersDefinitions(container);
    return container
}

