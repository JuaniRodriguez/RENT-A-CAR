const rentsService=require('../../service/rentsService.js');
const rentsRepository=require('../../repository/rentsRepository.js');
const rentsController=require('../rentsController.js')

const mockCarsService= {
    getAllCars:jest.fn(()=>Promise.resolve([]))
}
const mockUsersService= {
    getAllUsers:jest.fn(()=>Promise.resolve([]))
}

const mockRepository= {
    rentsRepository:jest.fn()
}
const mockService={
    getAllRents:jest.fn(()=>Promise.resolve([])),
    addRent:jest.fn(),
    editRent:jest.fn(),
    deleteRent:jest.fn(()=>Promise.resolve(true)),
    getRentById:jest.fn(()=>Promise.resolve({}))
}

const controller=new rentsController(mockCarsService,mockUsersService,mockService)

test('it test rentRoutes function', () => {
    const app = {
      get: jest.fn(),
      post: jest.fn(),
    };
    controller.rentRoutes(app);
});

test("it tests homePage render",async ()=> {
    const mockRender=jest.fn();
    await controller.rentPage({session:{errors:[]}},{render:mockRender});
    expect(mockRender).toHaveBeenCalledTimes(1);
    expect(mockRender).toHaveBeenCalledWith('rent/view/allRents.html', {
        rentedCars:[],
        errors:[]
    })
})

test("it tests that rentCar is renders form",async()=> {
    const mockRender=jest.fn();
    await controller.rentCar({},{render:mockRender});
    expect(mockRender).toHaveBeenCalledTimes(1);
    expect(mockRender).toHaveBeenCalledWith('rent/view/rentForm.html',{
        cars:[],
        users:[]
    })
})


test("it tests rentCar function with exception",async()=> {
    const mockRedirect=jest.fn();
    mockService.addRent.mockImplementationOnce(()=>{
        throw Error('Example')
    })
    const req={session:{errors:{}}};
    await controller.rentCar(req,{redirect:mockRedirect});
    expect(mockRedirect).toHaveBeenCalledTimes(1)
    expect(mockRedirect).toHaveBeenCalledWith('/rent');
    expect(req.session.errors).not.toEqual([])
})

test("it tests rentedCar function",async()=> {
    const mockRedirect=jest.fn()
    const rentData={car:"toyota",user:"juan",startDate:"2023-02-26",finishDate:"2023-02-28"};
    await controller.rentedCar({session:{errors:[]},body:rentData},{redirect:mockRedirect})
    expect(mockService.addRent).toHaveBeenCalledTimes(1)
    expect(mockRedirect).toHaveBeenCalledTimes(1)
    expect(mockRedirect).toHaveBeenCalledWith('/rent');
})

test("it test editRent function",async()=> {
    const mockRender=jest.fn();
    const req={params:{'id':1}}
    await controller.editRent(req,{render:mockRender});
    expect(mockService.getRentById).toHaveBeenCalledTimes(1)
    expect(mockService.getRentById).toHaveBeenCalledWith(1);
    expect(mockRender).toHaveBeenCalledWith('rent/view/editRentForm.html', {
        rentData:{},
        cars:[],
        users:[],
})
})

test("it tests editRent function with exception",async()=> {
    const mockRedirect=jest.fn();
    mockService.editRent.mockImplementationOnce(()=>{
        throw Error('Example')
    });
    const req={session:{errors:{}},params:{'id':1}};
    await controller.editRent(req,{redirect:mockRedirect});
    expect(mockRedirect).toHaveBeenCalledTimes(1)
    expect(mockRedirect).toHaveBeenCalledWith('/rent');
    expect(req.session.errors).not.toEqual([])
})

test("it tests editedRent function",async()=> {
    const mockRedirect=jest.fn();
    const rentData={car:"toyota",user:"juan",startDate:"2023-02-26",finishDate:"2023-02-28"};
    await controller.editedRent({session:{errors:[]},body:rentData},{redirect:mockRedirect});
    expect(mockService.editRent).toHaveBeenCalledTimes(1)
    expect(mockRedirect).toHaveBeenCalledTimes(1)
    expect(mockRedirect).toHaveBeenCalledWith('/rent')
})

test("it tests editedRent function with exception",async()=> {
    const mockRedirect=jest.fn();
    mockService.editRent.mockImplementationOnce(()=>{
        throw Error('Example')
    })
    const req={session:{errors:{}}};
    await controller.editedRent(req,{redirect:mockRedirect});
    expect(mockRedirect).toHaveBeenCalledTimes(1)
    expect(mockRedirect).toHaveBeenCalledWith('/rent');
    expect(req.session.errors).not.toEqual([])
})



test('it tests deleteRent function',async()=> {
    const mockRedirect=jest.fn();
    const req={params:{'id':1}}
    await controller.deleteRent(req,{redirect:mockRedirect})
    expect(mockService.deleteRent).toHaveBeenCalledTimes(1)
    expect(mockService.deleteRent).toHaveBeenCalledWith(1);
    expect(mockRedirect).toHaveBeenCalledTimes(1);
    expect(mockRedirect).toHaveBeenCalledWith('/rent')
})

test("it tests deleteRent function with exception",async()=> {
    const mockRedirect=jest.fn();
    mockService.deleteRent.mockImplementationOnce(()=>{
        throw Error('Example')
    });
    const req={session:{errors:{}},params:{'id':1}};
    await controller.deleteRent(req,{redirect:mockRedirect});
    expect(mockRedirect).toHaveBeenCalledTimes(1)
    expect(mockRedirect).toHaveBeenCalledWith('/rent');
    expect(req.session.errors).not.toEqual([])
})

/*
npm run test -t rentsController.spec.js
*/