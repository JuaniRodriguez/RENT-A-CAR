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
        const errors=req.session.errors;
        res.render('users/view/allUsers.html', {
            usersData,
            errors
        }  
        )
        req.session.errors=[];
    }

    async createUser(req,res) {
        res.render('users/view/createUserForm.html')
    }

    async createdUser(req,res) {
        try {
        const formData=req.body;
        await this.usersService.createUser(formData);
        } catch(e) {
            req.session.errors=[e.message]
        }
        res.redirect('/users')
    }

    async editUser(req,res) {
        const id=req.params['id'];
        try {
            const userData= await this.usersService.getUserById(id);
            res.render('users/view/editUserForm.html', {
                userData
            })
        } catch(e) {
            req.session.errors=[e.message]
            res.redirect('/users')
        }
    }

    async editedUser(req,res) {
        const formData=req.body;
        try {
            await this.usersService.editUser(formData);
        }catch(e) {
            req.session.errors=[e.message]
        }
        res.redirect('/users')
    }

    async deleteUser(req,res) {
        try {
            await this.usersService.deleteUser(req.params['id']);
        }catch(e) {
            req.session.errors=[e.message]

        }
        res.redirect('/users')
    }
}