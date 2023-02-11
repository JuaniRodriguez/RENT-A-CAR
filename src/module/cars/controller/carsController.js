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
        app.get(`${baseRoute}/:id/editCarForm`,this.editCar.bind(this));
        app.post(`${baseRoute}/:id/editCarForm`,this.uploadDataHandler.single('uploadedImage'),this.editedCar.bind(this))
        app.get(`${baseRoute}/deleteCar/:id`,this.deleteCar.bind(this))
    }
    
    async homePage(req,res) {
        //tengo que traer la data de la base para mostrar
        const carsData= await this.carsService.getAllCars();
        res.render('cars/view/cars.html', {
            carsData
        })
    }

    async createCar(req,res) {
        res.render('cars/view/createCarForm.html')
    }

    async createdCar(req,res) {
        const data=req.body;
        if(req.file!==undefined) {
            data.picture=`/public/uploads/${req.file.filename}`
            console.log(data);
        }
        await this.carsService.createCar(data);
        res.redirect('/')
    }

    async editCar(req,res) {
        const id=req.params['id'];
        const data= await this.carsService.getCarById(id);
        res.render('cars/view/editCarForm.html', {
            data
        })
    }

    async editedCar(req,res) {
        const data=req.body;
        if(req.file!==undefined) {
            data.picture=`/public/uploads/${req.file.filename}`
        } 
        await this.carsService.editCar(data);
        res.redirect('/')
    }
    

    async deleteCar(req,res) {
        console.log(req.params['id'])
        const carToDelete= await this.carsService.deleteCar(req.params['id']);
        res.redirect('/')
    }
}

//crear el form de editar
// agregar botones de agregar auto(en la nav), editar y borrar como columnas