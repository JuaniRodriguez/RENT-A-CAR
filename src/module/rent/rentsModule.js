const rentsController=require('./controller/rentsController.js');
const rentsService=require('./service/rentsService.js')
const rentsRepository=require('./repository/rentsRepository.js')

function initRent(app,container) {

    const controller=container.get('rentsController');
    controller.rentRoutes(app)
}

module.exports= {
    initRent,
    rentsController,
    rentsService,
    rentsRepository
}