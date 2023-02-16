module.exports= class rentController {
    constructor(carsService,usersService,rentsService) {
        this.carsService=carsService,
        this.usersService=usersService,
        this.rentsService=rentsService
    }

    rentRoutes(app) {
        const baseRoute='/rent';
        app.get(`${baseRoute}`,this.rentPage.bind(this));
        app.get(`${baseRoute}/rentForm`,this.rentCar.bind(this));
        //app.post(`${baseRoute}/createUserForm`,this.createdUser.bind(this));
        //app.get(`${baseRoute}/:id/editUserForm`,this.editUser.bind(this));
        //app.post(`${baseRoute}/:id/editUserForm`,this.editedUser.bind(this));
        //app.get(`${baseRoute}/deleteUser/:id`,this.deleteUser.bind(this))
    }

    async rentPage(req,res) {
        /*const rentedCars=await this.rentsService.getAllRents();*/
        res.render('rent/view/rent.html'/*, {
            rentedCars
        }*/)
        //aca debo agregar la data para mostrar
    }

    async rentCar(req,res) {
        res.render('rent/view/rentForm.html')
        //debe recibir data de auto
    }
    


}