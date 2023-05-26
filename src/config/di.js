const path=require('path');
const multer=require('multer');
//const database=require('better-sqlite3');
const fs=require('fs');
const session=require('express-session');
const {Sequelize}=require('sequelize')

const { default:DIContainer,object,use,factory} = require('rsdi');
const {carsController,carsService,carsRepository,carsModel}= require('../module/cars/carsModule.js');
const {usersController,usersService,usersRepository,usersModel}= require('../module/users/usersModule.js');
const {rentsController,rentsRepository,rentsService,rentsModel}=require('../module/rent/rentsModule.js')


//para sequelize, haria lo mismo que con runDataBase.
/*
function runDatabase() {
    const dataBase=new database(process.env.DB_PATH,{verbose:console.log});
    const tables = fs.readFileSync(process.env.DB_TABLES_PATH, 'utf8');
    dataBase.exec(tables);

    return dataBase
}*/

function runSequelize() {

    const sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: process.env.DB_PATH,
        //logging: (...msg) => console.log(msg)
    });
    return sequelize
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

function configureCarModel(container) {
    //si mal no comprendo, este container.get sequelize lo busca en common definitions, que tiene un sequeilize.
    return carsModel.setup(container.get('sequelize'))
}   

function configureUserModel(container) {
    return usersModel.setup(container.get('sequelize'))
}  

function configureRentModel(container) {
    const model=rentsModel.setup(container.get('sequelize'))
    model.setupAssociations(carsModel,usersModel)
    return model
   
}  

function addCommonDefinitions(container) {
    container.add({
        //runDatabase:factory(runDatabase),
        uploadImages:factory(uploadImages),
        session:factory(configureSession),
        sequelize:factory(runSequelize)
    })
}

function addCarsDefinitions(container) {
    // lo que va dentro de object(objeto) es un una clase, y como la construyo(construct)? con lo que lleva dentro del constructor para funcionar.
    container.add({
        carsController:object(carsController).construct(use('carsService'),use('uploadImages')),
        carsService:object(carsService).construct(use('carsRepository')),
        carsRepository:object(carsRepository).construct(use('carsModel')),
        carsModel: factory(configureCarModel)
    })
}

function addUsersDefinitions(container) {
    container.add({
        usersController:object(usersController).construct(use('usersService')),
        usersService:object(usersService).construct(use('usersRepository')),
        usersRepository:object(usersRepository).construct(use('usersModel')),
        usersModel:factory(configureUserModel)
    })
}

function addRentsDefinitions(container) {
    container.add({
        rentsController:object(rentsController).construct(use('carsService'),use('usersService'),use('rentsService')),
        rentsService:object(rentsService).construct(use('rentsRepository')),
        rentsRepository:object(rentsRepository).construct(use('rentsModel')),
        rentsModel:factory(configureRentModel)

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

