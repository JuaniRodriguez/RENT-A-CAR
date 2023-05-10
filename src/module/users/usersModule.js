const usersController=require('./controller/usersController.js');
const usersRepository=require('./repository/usersRepository.js');
const usersService=require('./service/usersService');
const usersModel=require('./model/userModel.js');

function initUsers(app,container) {
    const controller=container.get('usersController');
    controller.usersRoutes(app)

}

module.exports= {
    initUsers,
    usersController,
    usersService,
    usersRepository,
    usersModel
}