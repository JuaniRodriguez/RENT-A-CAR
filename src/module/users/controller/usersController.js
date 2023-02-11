module.exports=class UsersController {
    constructor(usersService) {
        this.usersService=usersService;
    }
    usersRoutes(app) {
        const baseRoute='/users';
        app.get(`${baseRoute}`,this.usersPage.bind(this));
        app.get(`${baseRoute}/createUserForm`,this.createUser.bind(this));
        app.post(`${baseRoute}/createUserForm`,this.createdUser.bind(this));
        app.get(`${baseRoute}/:id/editUserForm`,this.editUser.bind(this));
        app.post(`${baseRoute}/:id/editUserForm`,this.editedUser.bind(this));
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
        const data=req.body;
        await this.usersService.createUser(data);
        res.redirect('/users')
    }

    async editUser(req,res) {
        const id=req.params['id'];
        const data= await this.usersService.getUserById(id);
        res.render('users/view/editUserForm.html', {
            data
        })
    }

    async editedUser(req,res) {
        const data=req.body;
        console.log(data)
        await this.usersService.editUser(data);
        res.redirect('/users')
    }
    

    async deleteUser(req,res) {
        console.log(req.params['id'])
        await this.usersService.deleteUser(req.params['id']);
        res.redirect('/users')
    }

    
}