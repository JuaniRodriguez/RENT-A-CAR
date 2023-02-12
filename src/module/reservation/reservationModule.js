const reservationController=require('./controller/reservationController.js');

function initReservation(app,container) {

    const controller=container.get('reservationController');
    controller.reservationRoutes(app)
}

module.exports= {
    initReservation,
    reservationController
}