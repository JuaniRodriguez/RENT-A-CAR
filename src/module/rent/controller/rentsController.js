
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
        const errors=req.session.errors
        res.render('rent/view/allRents.html', {
            rentedCars,
            errors
        })
        req.session.errors=[];

    }

    async rentCar(req,res) {
        try {
            const cars=await this.carsService.getAllCars();
            const users=await this.usersService.getAllUsers();
            res.render('rent/view/rentForm.html', {
                cars,
                users
            })
        }catch(e) {
            req.session.errors=[e.message]
        }
        
    }

    async rentedCar(req,res) {
        const formData=req.body;
        const totalDays=((new Date(formData.finishDate).getTime())-(new Date(formData.startDate).getTime()))/(1000*60*60*24)
        const newFormData={
            ...formData,
            totalDays
            
        }
        try {
            await this.rentsService.addRent(newFormData)
        }catch(e) {
            req.session.errors=[e.message]
        }
        res.redirect('/rent')
    }

    async editRent(req,res) {
        const id=req.params['id'];
        try {
            const rentData= await this.rentsService.getRentById(id);
            const cars=await this.carsService.getAllCars();
            const users=await this.usersService.getAllUsers();
            res.render('rent/view/editRentForm.html', {
                rentData,
                cars,
                users
            })
        } catch(e) {
            req.session.errors=[e.message]

        }
        
    }

    async editedRent(req,res) {
        const editFormData=req.body;
        const totalDays=((new Date(editFormData.finishDate).getTime())-(new Date(editFormData.startDate).getTime()))/(1000*60*60*24)
        const newFormData={
            ...editFormData,
            totalDays
            
        }
        try {
            await this.rentsService.editRent(newFormData);
        }catch(e) {
            req.session.errors=[e.message]

        }
        res.redirect('/rent')

    }

    async deleteRent(req,res) {
        const id=req.params['id'];
        try {
            await this.rentsService.deleteRent(id);
        }catch(e) {
            req.session.errors=[e.message]

        }
        res.redirect('/rent')

    }
}