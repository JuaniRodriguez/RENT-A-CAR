const carsService=require('../service/carsService.js')

module.exports= class carsController {
    constructor(carsService,uploadDataHandler) {
        this.carsService=carsService,
        this.uploadDataHandler=uploadDataHandler
    }
    
    carRoutes(app) {
        const baseRoute='/cars';
        app.get(`${baseRoute}`,this.homePage.bind(this));
        app.get(`${baseRoute}/createCarForm`,this.createCar.bind(this));
        app.post(`${baseRoute}/createCarForm`,this.uploadDataHandler.single('uploadedImage'),this.createdCar.bind(this));
        app.get(`${baseRoute}/:id/editCar`,this.editCar.bind(this));
        app.post(`${baseRoute}/:id/editCar`,this.uploadDataHandler.single('uploadedImage'),this.editedCar.bind(this))
        app.get(`${baseRoute}/:id/deleteCar`,this.deleteCar.bind(this))
    }
    
    async homePage(req,res) {
        //tengo que traer la data de la base para mostrar
        const carsData= await this.carsService.getAllCars();
        console.log(carsData)
        res.render('cars/view/cars.html', {
            carsData
        })
        
        //debo renderizar un view de clubs, que extienda de defaultPage.
    }

    async createCar(req,res) {
        res.render('cars/view/createCarForm.html')
    }

    async createdCar(req,res) {
        const data=req.body;
        if(req.file==undefined) {
            console.log(data);
        } else {
            data.picture=`/public/uploads/${req.file.filename}`
            console.log(data);
        }
        //const data=req.body;
        //console.log(req.file)
        //console.log(req.file.filename)
        //console.log(req.body);
        await this.carsService.createCar(data);
        res.redirect('/')

    }

    async editCar(req,res) {
        //debo traer de la base de datos el club, y pasarlo como nunjucks al html//
        const data= await this.service.getCarById();

        res.render('editCarForm.html', {data})
    }

    async editedCar(req,res) {
        //le podria pasar el id como :id
        const data=req.body;
        console.log(data);
        await this.service.editCar(data.id)
        res.redirect('/')
        
    }
    

    async deleteCar(req,res) {
        const carToDelete= await this.service.deleteCar(req.params['id']);
        res.redirect('/')
    }
}

//crear el form de editar
// agregar botones de agregar auto(en la nav), editar y borrar como columnas