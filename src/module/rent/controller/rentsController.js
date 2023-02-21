
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
        app.get(`${baseRoute}/editRentForm/:id`,this.editRent.bind(this));
        app.post(`${baseRoute}/editRentForm/:id`,this.editedRent.bind(this));
        app.get(`${baseRoute}/deleteRent/:id`,this.deleteRent.bind(this))
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

    async editRent(req,res) {
        const id=req.params['id'];
        const rentData= await this.rentsService.getRentById(id);
        const cars=await this.carsService.getAllCars();
        const users=await this.usersService.getAllUsers();
        res.render('rent/view/editRentForm.html', {
            rentData,
            cars,
            users
        })
    }

    async editedRent(req,res) {
        const editFormData=req.body;
        const totalDays=((new Date(editFormData.finishDate).getTime())-(new Date(editFormData.startDate).getTime()))/(1000*60*60*24)
        //const totalDays=Math.ceil(())
        const newFormData={
            ...editFormData,
            totalDays
            
        }
        await this.rentsService.editRent(newFormData);
        res.redirect('/rent')
    }

    async deleteRent(req,res) {
        const id=req.params['id'];
        await this.rentsService.deleteRent(id);
        res.redirect('/rent')
    }
}