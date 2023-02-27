const carsRepository=require('../../repository/carsRepository.js');
const carsService=require('../carsService.js');

const mockRepository= {
    getAllCars:jest.fn(),
    addCar:jest.fn(),
    editCar:jest.fn(),
    deleteCar:jest.fn(),
    getCarById:jest.fn()
}
const service=new carsService(mockRepository);

test("it tests getAllCars from repository function",()=> {
        service.getAllCars()
        expect(mockRepository.getAllCars).toHaveBeenCalledTimes(1)
})

test("it tests that addCar from repository is called once",()=> {
        service.createCar({})
        expect(mockRepository.addCar).toHaveBeenCalledTimes(1);

})

test("it tests that editCar from repository is called once",()=> {
    service.editCar({})
    expect(mockRepository.editCar).toHaveBeenCalledTimes(1)
})

test("it test that deleteCar from repository is called once",()=> {
    service.deleteCar(1)
    expect(mockRepository.deleteCar).toHaveBeenCalledTimes(1)
})

test("it test that getCarById from repository is called once",()=> {
    service.getCarById(1)
    expect(mockRepository.getCarById).toHaveBeenCalledTimes(1)
})
