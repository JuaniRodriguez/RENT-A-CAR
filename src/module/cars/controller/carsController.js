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
        app.get(`${baseRoute}/editCarForm/:id`,this.editCar.bind(this));
        app.post(`${baseRoute}/editCarForm/:id`,this.uploadDataHandler.single('uploadedImage'),this.editedCar.bind(this))
        app.get(`${baseRoute}/deleteCar/:id`,this.deleteCar.bind(this))
    }
    
    async homePage(req,res) {   
        const carsData= await this.carsService.getAllCars();
        const errors=req.session.errors;
        console.log(errors);
        res.render('cars/view/cars.html', {
            carsData,
            errors
        })
        req.session.errors=[];
    }

    async createCar(req,res) {
        res.render('cars/view/createCarForm.html')
    }

    async createdCar(req,res) {
        try {
            const formData=req.body;
            if(req.file!==undefined) {
                formData.picture=`/public/uploads/${req.file.filename}`
            }
            await this.carsService.createCar(formData);
        } catch(e) {
            req.session.errors=[e.message]

        }
        
        res.redirect('/')
    }

    async editCar(req,res) {
        const id=req.params['id'];
        try {
            const carData= await this.carsService.getCarById(id);
            res.render('cars/view/editCarForm.html', {
                carData
            })
        } catch(e) {
            req.session.errors=[e.message];
            res.redirect('/')
        }
        
    }

    async editedCar(req,res) {
        try {
            const formData=req.body;
            if(req.file!==undefined) {
                formData.picture=`/public/uploads/${req.file.filename}`
            } 
            await this.carsService.editCar(formData);
        } catch(e) {
            req.session.errors=[e.message]   
        }
        res.redirect('/')
    }
    

    async deleteCar(req,res) {
        try {
            await this.carsService.deleteCar(req.params['id']);
        } catch (e) {
            req.session.errors=[e.message]
        }
        
        res.redirect('/')
    }
}

