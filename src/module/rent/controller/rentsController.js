
module.exports= class rentsController {
    constructor(carsService,usersService,rentsService) {
        this.carsService=carsService,
        this.usersService=usersService,
        this.rentsService=rentsService
    }

    rentRoutes(app) {
        const baseRoute='/rent';
        app.get(`${baseRoute}`,this.rentPage.bind(this));
        app.get(`${baseRoute}/rentForm`,this.rentCar.bind(this));
        app.post(`${baseRoute}/rentForm`,this.rentedCar.bind(this));
        //app.get(`${baseRoute}/:id/editUserForm`,this.editUser.bind(this));
        //app.post(`${baseRoute}/:id/editUserForm`,this.editedUser.bind(this));
        //app.get(`${baseRoute}/deleteUser/:id`,this.deleteUser.bind(this))
    }

    async rentPage(req,res) {
        const rentedCars=await this.rentsService.getAllRents();
        console.log(rentedCars);
        res.render('rent/view/rentsList.html', {
            rentedCars
        })
        //aca debo agregar la data para mostrar
    }

    async rentCar(req,res) {
        const cars=await this.carsService.getAllCars();
        const users=await this.usersService.getAllUsers();
        res.render('rent/view/rentForm.html', {
            cars,
            users
        })
        //debe recibir data de auto
    }

    async rentedCar(req,res) {
        const formData=req.body;
        const totalDays=((new Date(formData.finishDate).getTime())-(new Date(formData.startDate).getTime()))/(1000*60*60*24)
        //const totalDays=Math.ceil(())
        const newFormData={
            ...formData,
            totalDays
            
        }
        //console.log(newFormData)
        //res.end()
        await this.rentsService.addRent(newFormData)
        res.redirect('/rent')
    }

}