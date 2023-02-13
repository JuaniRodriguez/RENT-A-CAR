module.exports= class reservationController {
    constructor(reservationService) {
        this.reservationService=reservationService
    }

    reservationRoutes(app) {
        const baseRoute='/reservation';
        app.get(`${baseRoute}`,this.reservationPage.bind(this));
        app.get(`${baseRoute}/reservationForm`,this.reserveCar.bind(this));
        //app.post(`${baseRoute}/createUserForm`,this.createdUser.bind(this));
        //app.get(`${baseRoute}/:id/editUserForm`,this.editUser.bind(this));
        //app.post(`${baseRoute}/:id/editUserForm`,this.editedUser.bind(this));
        //app.get(`${baseRoute}/deleteUser/:id`,this.deleteUser.bind(this))
    }

    async reservationPage(req,res) {
        res.render('reservation/view/reservation.html')
        //aca debo agregar la data para mostrar
    }

    async reserveCar(req,res) {
        res.render('reservation/view/reservationForm.html')
        //debe recibir data de auto
    }


}