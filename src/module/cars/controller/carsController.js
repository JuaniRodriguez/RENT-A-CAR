const carsService=require('../service/carsService.js')

export class carsController {
    constructor(carsService,uploadDataHandler) {
        this.carsService=carsService,
        this.dataHandler=uploadDataHandler
    }
    /*
    carRoutes(app) {
        const baseRoute='/cars';
        //post
        app.get(`${baseRoute}/createCarForm`,this.createCar.bind(this));
        app.post(`${baseRoute}/createCarForm`,this.uploadDataHandler.single('uploadedImage'),this.createdCar.bind(this));
        app.get(`${baseRoute}/editCar`,this.editCar.bind(this));
        app.post(`${baseRoute}/editCar`,this.uploadDataHandler.single('uploadedImage'),this.editedCar.bind(this))
        app.get(`${baseRoute}/deleteCar`,this.deleteCar.bind(this))
    }

    async createCar(req,res) {
        res.render('createCarForm.html')
    }

    async editCar(req,res) {
        res.render('editCarForm.html')
    }
    */


}