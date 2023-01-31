const carsService=require('../service/carsService.js')

export class carsController {
    constructor(carsService) {
        this.carsService=carsService
    }
    //ver lo de upload
    carRoutes(app) {
        const baseRoute='/cars';
        //post
        app.get(`${baseRoute}/createCarForm`,this.createCar.bind(this));
        app.post(`${baseRoute}/createCarForm`,this.createdCar.bind(this));
        app.get(`${baseRoute}/editCar`,this.editCar.bind(this));
        app.post(`${baseRoute}/editCar`,this.editedCar.bind(this))
        app.get(`${baseRoute}/deleteCar`,this.deleteCar.bind(this))
    }

    async createCar(req,res) {
        res.render('createCarForm.html')
    }

    async editCar(req,res) {
        res.render('editCarForm.html')
    }

    

    //carRoutes(app) {
    //    //aca solo va un get al form, luego hago el post para crear el car
    //    app.get('/cars/CreateCarForm',(req,res)=> {
    //        res.render('createCar.html')
    //    }
    //    //crear el form
//
//
    //    )
    //}


}