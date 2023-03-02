const path=require('path');
const multer=require('multer');
const database=require('better-sqlite3');
const fs=require('fs');
const session=require('cookie-session');

const { default:DIContainer,object,use,factory} = require('rsdi');
const {carsController,carsService,carsRepository}= require('../module/cars/carsModule.js');
const {usersController,usersService,usersRepository}= require('../module/users/usersModule.js');
const {rentsController,rentsRepository,rentsService}=require('../module/rent/rentsModule.js')

function runDatabase() {
    const dataBase=new database(process.env.DB_PATH,{verbose:console.log});
    const tables = fs.readFileSync(process.env.DB_TABLES_PATH, 'utf8');
    dataBase.exec(tables);

    return dataBase
}

function configureSession() {
    const ONE_WEEK_IN_SECONDS = 604800000;
  
    const sessionOptions = {
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: { maxAge: ONE_WEEK_IN_SECONDS },
    };
    return session(sessionOptions);
}


function uploadImages() {
    const storage=multer.diskStorage({
        destination:function(req,file,cb) {
            cb(null,"public/uploads")
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
        uploadImages:factory(uploadImages),
        session:factory(configureSession)
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
        usersController:object(usersController).construct(use('usersService')),
        usersService:object(usersService).construct(use('usersRepository')),
        usersRepository:object(usersRepository).construct(use('runDatabase'))
    })
}

function addRentsDefinitions(container) {
    container.add({
        rentsController:object(rentsController).construct(use('carsService'),use('usersService'),use('rentsService')),
        rentsService:object(rentsService).construct(use('rentsRepository')),
        rentsRepository:object(rentsRepository).construct(use('runDatabase'))

    })
}
module.exports= function configureDI() {
    const container=new DIContainer();
    addCommonDefinitions(container);
    addCarsDefinitions(container);
    addUsersDefinitions(container);
    addRentsDefinitions(container);
    return container
}

