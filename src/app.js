const { config } = require('dotenv');
const express=require('express');
const nunjucks=require('nunjucks');
require('dotenv').config();

const configureDependencyInjection=require('./config/di.js')
const carModule=require('./module/cars/carsModule.js');
const usersModule=require('./module/users/usersModule.js')
const rentsModule=require('./module/rent/rentsModule.js')

const app=express();
const port=3000;

app.use(express.urlencoded({ extended: true }));  
app.use('/public', express.static('public'));


nunjucks.configure('src/module', {
    autoescape:true,
    express:app,
})


const container=configureDependencyInjection(app);
app.use(container.get('session'));
carModule.initApp(app,container);
usersModule.initUsers(app,container);
rentsModule.initRent(app,container)

const carsController=container.get('carsController');
app.get('/',carsController.homePage.bind(carsController));


app.listen(port)

