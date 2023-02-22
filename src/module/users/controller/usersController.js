module.exports=class UsersController {
    constructor(usersService) {
        this.usersService=usersService;
    }
    usersRoutes(app) {
        const baseRoute='/users';
        app.get(`${baseRoute}`,this.usersPage.bind(this));
        app.get(`${baseRoute}/createUserForm`,this.createUser.bind(this));
        app.post(`${baseRoute}/createUserForm`,this.createdUser.bind(this));
        app.get(`${baseRoute}/editUserForm/:id`,this.editUser.bind(this));
        app.post(`${baseRoute}/editUserForm/:id`,this.editedUser.bind(this));
        app.get(`${baseRoute}/deleteUser/:id`,this.deleteUser.bind(this))
    }

    async usersPage(req,res) {
        const usersData=await this.usersService.getAllUsers();
        res.render('users/view/usersList.html', {
            usersData
        }  
        )
    }

    async createUser(req,res) {
        res.render('users/view/createUserForm.html')
    }

    async createdUser(req,res) {
        const formData=req.body;
        await this.usersService.createUser(formData);
        res.redirect('/users')
    }

    async editUser(req,res) {
        const id=req.params['id'];
        const userData= await this.usersService.getUserById(id);
        res.render('users/view/editUserForm.html', {
            userData
        })
    }

    async editedUser(req,res) {
        const formData=req.body;
        await this.usersService.editUser(formData);
        res.redirect('/users')
    }
    

    async deleteUser(req,res) {
        await this.usersService.deleteUser(req.params['id']);
        res.redirect('/users')
    }

    
}