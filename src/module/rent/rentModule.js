const rentController=require('./controller/rentController.js');

function initRent(app,container) {

    const controller=container.get('rentController');
    controller.rentRoutes(app)
}

module.exports= {
    initRent,
    rentController
}