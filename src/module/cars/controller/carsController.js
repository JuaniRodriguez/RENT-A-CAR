const carsService=require('../service/carsService.js')

export class carsController {
    constructor(carsService) {
        this.carsService=carsService
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