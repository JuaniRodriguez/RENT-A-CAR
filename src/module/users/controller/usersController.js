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
        res.render('users/view/users.html')
    }

    async createUser(req,res) {
        res.render('users/view/createUserForm.html')
    }

    async createdUser(req,res) {
        const data=req.body;
        await this.UsersService.createUser(data);
        res.redirect('/')
    }

    async editUser(req,res) {
        const id=req.params['id'];
        const data= await this.UsersService.getUserById(id);
        res.render('Users/view/editUserForm.html', {
            data
        })
    }

    async editedUser(req,res) {
        const data=req.body;
        if(req.file!==undefined) {
            data.picture=`/public/uploads/${req.file.filename}`
        } 
        await this.UsersService.editUser(data);
        res.redirect('/')
    }
    

    async deleteUser(req,res) {
        console.log(req.params['id'])
        const UserToDelete= await this.UsersService.deleteUser(req.params['id']);
        res.redirect('/')
    }

    
}