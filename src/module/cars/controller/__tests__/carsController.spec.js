const carsService=require('../../service/carsService.js');
const carsRepository=require('../../repository/carsRepository.js');
const carsController=require('../carsController.js')

const uploadDataHandler = {
    single: jest.fn(),
  };

const mockRepository= {
    carsRepository:jest.fn()
}
const mockService={
    getAllCars:jest.fn(()=>Promise.resolve([])),
    createCar:jest.fn(),
    editCar:jest.fn(),
    deleteCar:jest.fn(()=>Promise.resolve(true)),
    getCarById:jest.fn(()=>Promise.resolve({}))
}

const controller=new carsController(mockService,uploadDataHandler)

test('it test carRoutes function', () => {
    const app = {
      get: jest.fn(),
      post: jest.fn(),
    };
    controller.carRoutes(app);
});

test("it tests homePage render",async ()=> {
    const mockRender=jest.fn();
    await controller.homePage({session:{errors:[]}},{render:mockRender});
    expect(mockRender).toHaveBeenCalledTimes(1);
    expect(mockRender).toHaveBeenCalledWith('cars/view/cars.html', {
        carsData:[],
        errors:[]
    })
    //expect(mockService.getAllCars).toHaveBeenCalledTimes(1);

})



test("it tests that createCarForm is render",async()=> {
    const mockRender=jest.fn();
    await controller.createCar({},{render:mockRender});
    expect(mockRender).toHaveBeenCalledTimes(1);
    expect(mockRender).toHaveBeenCalledWith('cars/view/createCarForm.html')
})

test("it tests createdCar function with file and correct data",async()=> {
    const mockRedirect=jest.fn();
    const carData={brand:"toyota",model:"hilux",year:2022,kms:15000,color:"red",ac:"yes",passengers:6,transmission:"manual",picture:"",price:150};
    await controller.createdCar({session:{errors:[]},body:carData,file:{filename:"picture.png"}},{redirect:mockRedirect});
    expect(mockService.createCar).toHaveBeenCalledWith(carData);
    expect(mockService.createCar).toHaveBeenCalledTimes(1)
    expect(mockRedirect).toHaveBeenCalledTimes(1)
    expect(mockRedirect).toHaveBeenCalledWith('/')
})

test("it tests createdCar function with exception",async()=> {
    const mockRedirect=jest.fn();
    mockService.createCar.mockImplementationOnce(()=>{
        throw Error('Example')
    })
    const req={session:{errors:{}}};
    await controller.createdCar(req,{redirect:mockRedirect});
    expect(mockRedirect).toHaveBeenCalledTimes(1)
    expect(mockRedirect).toHaveBeenCalledWith('/');
    expect(req.session.errors).not.toEqual([])
})

test("it test editCar function",async()=> {
    const mockRender=jest.fn();
    const req={params:{'id':1}}
    await controller.editCar(req,{render:mockRender});
    expect(mockService.getCarById).toHaveBeenCalledTimes(1)
    expect(mockService.getCarById).toHaveBeenCalledWith(1);
    expect(mockRender).toHaveBeenCalledWith('cars/view/editCarForm.html', {
        carData:{}
})
})

test("it tests editCar function with exception",async()=> {
    const mockRedirect=jest.fn();
    mockService.editCar.mockImplementationOnce(()=>{
        throw Error('Example')
    });
    const req={session:{errors:{}},params:{'id':1}};
    await controller.editCar(req,{redirect:mockRedirect});
    expect(mockRedirect).toHaveBeenCalledTimes(1)
    expect(mockRedirect).toHaveBeenCalledWith('/');
    expect(req.session.errors).not.toEqual([])
})

test("it tests edited function with file and correct data",async()=> {
    const mockRedirect=jest.fn();
    const carData={brand:"toyota",model:"hilux",year:2022,kms:15000,color:"red",ac:"yes",passengers:6,transmission:"manual",picture:"",price:150};
    await controller.editedCar({session:{errors:[]},body:carData,file:{filename:"picture.png"}},{redirect:mockRedirect});
    expect(mockService.editCar).toHaveBeenCalledWith(carData);
    expect(mockService.editCar).toHaveBeenCalledTimes(1)
    expect(mockRedirect).toHaveBeenCalledTimes(1)
    expect(mockRedirect).toHaveBeenCalledWith('/')
})

test("it tests editedCar function with exception",async()=> {
    const mockRedirect=jest.fn();
    mockService.editCar.mockImplementationOnce(()=>{
        throw Error('Example')
    })
    const req={session:{errors:{}}};
    await controller.editedCar(req,{redirect:mockRedirect});
    expect(mockRedirect).toHaveBeenCalledTimes(1)
    expect(mockRedirect).toHaveBeenCalledWith('/');
    expect(req.session.errors).not.toEqual([])
})




test('it tests deleteCar function',async()=> {
    const mockRedirect=jest.fn();
    const req={params:{'id':1}}
    await controller.deleteCar(req,{redirect:mockRedirect})
    expect(mockService.deleteCar).toHaveBeenCalledTimes(1)
    expect(mockService.deleteCar).toHaveBeenCalledWith(1);
    expect(mockRedirect).toHaveBeenCalledTimes(1);
    expect(mockRedirect).toHaveBeenCalledWith('/')
})

test("it tests deleteCar function with exception",async()=> {
    const mockRedirect=jest.fn();
    mockService.deleteCar.mockImplementationOnce(()=>{
        throw Error('Example')
    });
    const req={session:{errors:{}},params:{'id':1}};
    await controller.deleteCar(req,{redirect:mockRedirect});
    expect(mockRedirect).toHaveBeenCalledTimes(1)
    expect(mockRedirect).toHaveBeenCalledWith('/');
    expect(req.session.errors).not.toEqual([])
})

/*
npm run test -t carsController.spec.js
*/