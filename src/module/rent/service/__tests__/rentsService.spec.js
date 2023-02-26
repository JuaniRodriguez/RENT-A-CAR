const rentsService=require('../rentsService.js');

const mockRepository= {
    getAllRents:jest.fn(),
    addRent:jest.fn(),
    editRent:jest.fn(),
    deleteRent:jest.fn(),
    getRentById:jest.fn()
}
const service=new rentsService(mockRepository);

test("it tests getAllRents from repository function",()=> {
        service.getAllRents()
        expect(mockRepository.getAllRents).toHaveBeenCalledTimes(1)
})

test("it tests that addRent from repository is called once",()=> {
        service.addRent({})
        expect(mockRepository.addRent).toHaveBeenCalledTimes(1);

})

test("it tests that editRent from repository is called once",()=> {
    service.editRent({})
    expect(mockRepository.editRent).toHaveBeenCalledTimes(1)
})

test("it test that deleteRent from repository is called once",()=> {
    service.deleteRent(1)
    expect(mockRepository.deleteRent).toHaveBeenCalledTimes(1)
})

test("it test that getRentById from repository is called once",()=> {
    service.getRentById(1)
    expect(mockRepository.getRentById).toHaveBeenCalledTimes(1)
})

/*
npm run test -t rentsService.spec.js
*/