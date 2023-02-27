const usersService=require('../../service/usersService.js');
const usersRepository=require('../../repository/usersRepository.js');
const usersController=require('../usersController.js')


const mockRepository= {
    usersRepository:jest.fn()
}
const mockService={
    getAllUsers:jest.fn(()=>Promise.resolve([])),
    createUser:jest.fn(),
    editUser:jest.fn(),
    deleteUser:jest.fn(()=>Promise.resolve(true)),
    getUserById:jest.fn(()=>Promise.resolve({}))
}

const controller=new usersController(mockService)

test('it test userRoutes function', () => {
    const app = {
      get: jest.fn(),
      post: jest.fn(),
    };
    controller.usersRoutes(app);
});

test("it tests usersPage render",async ()=> {
    const mockRender=jest.fn();
    await controller.usersPage({session:{errors:[]}},{render:mockRender});
    expect(mockRender).toHaveBeenCalledTimes(1);
    expect(mockRender).toHaveBeenCalledWith('users/view/allUsers.html', {
        usersData:[],
        errors:[]
    })

})



test("it tests that createUserForm is render",async()=> {
    const mockRender=jest.fn();
    await controller.createUser({},{render:mockRender});
    expect(mockRender).toHaveBeenCalledTimes(1);
    expect(mockRender).toHaveBeenCalledWith('users/view/createUserForm.html')
})

test("it tests createUser function with correct data",async()=> {
    const mockRedirect=jest.fn();
    await controller.createdUser({session:{errors:[]},body:{}},{redirect:mockRedirect});
    expect(mockService.createUser).toHaveBeenCalledWith({});
    expect(mockService.createUser).toHaveBeenCalledTimes(1)
    expect(mockRedirect).toHaveBeenCalledTimes(1)
    expect(mockRedirect).toHaveBeenCalledWith('/users')
})


test("it tests createUser function with exception",async()=> {
    const mockRedirect=jest.fn();
    mockService.createUser.mockImplementationOnce(()=>{
        throw Error('Example')
    })
    const req={session:{errors:{}}};
    await controller.createdUser(req,{redirect:mockRedirect});
    expect(mockRedirect).toHaveBeenCalledTimes(1)
    expect(mockRedirect).toHaveBeenCalledWith('/users');
    expect(req.session.errors).not.toEqual([])
})

test("it test editUser function",async()=> {
    const mockRender=jest.fn();
    const req={params:{'id':1}}
    await controller.editUser(req,{render:mockRender});
    expect(mockService.getUserById).toHaveBeenCalledTimes(1)
    expect(mockService.getUserById).toHaveBeenCalledWith(1);
    expect(mockRender).toHaveBeenCalledWith('users/view/editUserForm.html', {
        userData:{}
    })
})

test("it tests editUser function with exception",async()=> {
    const mockRedirect=jest.fn();
    mockService.editUser.mockImplementationOnce(()=>{
        throw Error('Example')
    });
    const req={session:{errors:{}},params:{'id':1}};
    await controller.editUser(req,{redirect:mockRedirect});
    expect(mockRedirect).toHaveBeenCalledTimes(1)
    expect(mockRedirect).toHaveBeenCalledWith('/users');
    expect(req.session.errors).not.toEqual([])
})

test("it tests edited function with correct data",async()=> {
    const mockRedirect=jest.fn();
    await controller.editedUser({session:{errors:[]},body:{}},{redirect:mockRedirect});
    expect(mockService.editUser).toHaveBeenCalledWith({});
    expect(mockService.editUser).toHaveBeenCalledTimes(1)
    expect(mockRedirect).toHaveBeenCalledTimes(1)
    expect(mockRedirect).toHaveBeenCalledWith('/users')
})

test("it tests editedUser function with exception",async()=> {
    const mockRedirect=jest.fn();
    mockService.editUser.mockImplementationOnce(()=>{
        throw Error('Example')
    })
    const req={session:{errors:{}}};
    await controller.editedUser(req,{redirect:mockRedirect});
    expect(mockRedirect).toHaveBeenCalledTimes(1)
    expect(mockRedirect).toHaveBeenCalledWith('/users');
    expect(req.session.errors).not.toEqual([])
})

test('it tests deleteUser function',async()=> {
    const mockRedirect=jest.fn();
    const req={params:{'id':1}}
    await controller.deleteUser(req,{redirect:mockRedirect})
    expect(mockService.deleteUser).toHaveBeenCalledTimes(1)
    expect(mockService.deleteUser).toHaveBeenCalledWith(1);
    expect(mockRedirect).toHaveBeenCalledTimes(1);
    expect(mockRedirect).toHaveBeenCalledWith('/users')
})

test("it tests deleteUser function with exception",async()=> {
    const mockRedirect=jest.fn();
    mockService.deleteUser.mockImplementationOnce(()=>{
        throw Error('Example')
    });
    const req={session:{errors:{}},params:{'id':1}};
    await controller.deleteUser(req,{redirect:mockRedirect});
    expect(mockRedirect).toHaveBeenCalledTimes(1)
    expect(mockRedirect).toHaveBeenCalledWith('/users');
    expect(req.session.errors).not.toEqual([])
})

