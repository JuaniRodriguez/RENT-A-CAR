const express=require('express');
const nunjucks=require('nunjucks');
require('dotenv').config();



const app=express();
const port=3000;

app.use(express.urlencoded({ extended: true }));  
app.use('/public', express.static('public'));
  

nunjucks.configure('src/module/view', {
    autoescape:true,
    
    express:app,
})

app.get('/',(req,res)=> {
    res.render('defaultPage.html')
})



app.listen(port)


/*
me gustaria agregar imagen en tamano chico, y con un hover que se agrande
cuando agrego la info de un auto, que de la opcion de editar, eliminar, reservar
Creo que la tabla que cree, deberia traerla de la base de datos que creo, en realidad solo la info de las filas.
Creo que todo lo que va dentro del body, lo deberia pasar por nunjucks, no en default.html

*/