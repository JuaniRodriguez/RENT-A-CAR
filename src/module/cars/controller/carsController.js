const carsService=require('../service/carsService.js')

export class carsController {
    constructor(carsService,uploadDataHandler) {
        this.carsService=carsService,
        this.dataHandler=uploadDataHandler
    }
    /*
    carRoutes(app) {
        const baseRoute='/cars';
        app.get(`${baseRoute},this.homePage.bind(this));
        app.get(`${baseRoute}/createCarForm`,this.createCar.bind(this));
        app.post(`${baseRoute}/createCarForm`,this.uploadDataHandler.single('uploadedImage'),this.createdCar.bind(this));
        app.get(`${baseRoute}/editCar`,this.editCar.bind(this));
        app.post(`${baseRoute}/editCar`,this.uploadDataHandler.single('uploadedImage'),this.editedCar.bind(this))
        app.get(`${baseRoute}/deleteCar`,this.deleteCar.bind(this))
    }
    
    async homePage(req,res) {
        //tengo que traer la data de la base para mostrar
        const carsData=this.carsService.getAllCars();
        res.render('../view/cars.html', {
            data: {carsData}
        })
        
        //debo renderizar un view de clubs, que extienda de defaultPage.
    }

    async createCar(req,res) {
        res.render('createCarForm.html')
    }

    async createdCar(req,res) {
        const data=

    }

    async editCar(req,res) {
        res.render('editCarForm.html')
    }

    

    */

    

}