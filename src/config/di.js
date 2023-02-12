const path=require('path');
const multer=require('multer');
const database=require('better-sqlite3');
const { default:DIContainer,object,use,factory} = require('rsdi');
const {carsController,carsService,carsRepository}= require('../module/cars/carsModule.js');
const {usersController,usersService,usersRepository}= require('../module/users/usersModule.js');
const {reservationController}=require('../module/reservation/reservationModule.js')

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
    })//ver si tengo que correr la base de datos de vuelta
}

function addUsersDefinitions(container) {
    container.add({
        usersController:object(usersController).construct(use('usersService')),
        usersService:object(usersService).construct(use('usersRepository')),
        usersRepository:object(usersRepository).construct(use('runDatabase'))
    })
}

function addReservationDefinitions(container) {
    container.add({
        reservationController:object(reservationController).construct('reservationService')
    })
}
module.exports= function configureDI() {
    const container=new DIContainer();
    addCommonDefinitions(container);
    addCarsDefinitions(container);
    addUsersDefinitions(container);
    addReservationDefinitions(container);
    return container
}

