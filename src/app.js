const { config } = require('dotenv');
const express=require('express');
const nunjucks=require('nunjucks');
require('dotenv').config();

const configureDependencyInjection=require('./config/di.js')
//const {initApp: initCarModule}=require('./module/cars/carsModule.js')
const carModule=require('./module/cars/carsModule.js')

const app=express();
const port=3000;

app.use(express.urlencoded({ extended: true }));  
app.use('/public', express.static('public'));
  

nunjucks.configure('src/module', {
    autoescape:true,
    express:app,
})


const container=configureDependencyInjection(app);
carModule.initApp(app,container)
const carsController=container.get('carsController');
app.get('/',carsController.homePage.bind(carsController));



/*app.get('/',(req,res)=> {
    const carsData={
        id:1,
        brand:'toyota',
        model:2006,
        year:2014,
        KMS:50,
    }
    
    res.render('cars/view/cars.html', {
        carsData
        //data: {
        //    brand:"toyota",
        //    year:2006,
        //    color:"red"
        //}
    })
})

app.get('/cars/createCarForm', (req,res)=>  {

    res.render('cars/view/createCarForm.html')

})

app.post('createCarForm',(req,res)=> {
    console.log(req.body);
    res.redirect('/')
})

app.get('cars/:id/editCarForm',(req,res)=>{ 
    res.render('cars/view/editCarForm.html')
})

//app.post('cars/:id/editCarForm') {
//    
//}

*/


app.listen(port)


/*
me gustaria agregar imagen en tamano chico, y con un hover que se agrande
cuando agrego la info de un auto, que de la opcion de editar, eliminar, reservar
Creo que la tabla que cree, deberia traerla de la base de datos que creo, en realidad solo la info de las filas.
Creo que todo lo que va dentro del body, lo deberia pasar por nunjucks, no en default.html

*/