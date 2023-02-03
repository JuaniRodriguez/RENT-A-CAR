const carsController= require('./controller/carsController.js')
const carsService=require('./service/carsService.js')
const carsRepository=require('./repository/carsRepository.js')

function initApp(app,container) {

    const controller=container.get('carsController');
    controller.carRoutes(app)
}

module.exports = {
    initApp,
    carsController,
    carsService,
    carsRepository,
}
