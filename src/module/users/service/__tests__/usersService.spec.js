const usersService=require('../usersService.js');

const mockRepository= {
    getAllUsers:jest.fn(),
    addUser:jest.fn(),
    editUser:jest.fn(),
    deleteUser:jest.fn(),
    getUserById:jest.fn()
}

const service=new usersService(mockRepository);

test("it tests getAllUsers from repository function",()=> {
        service.getAllUsers()
        expect(mockRepository.getAllUsers).toHaveBeenCalledTimes(1)
})

test("it tests that addUser from repository is called once",()=> {
        service.createUser({})
        expect(mockRepository.addUser).toHaveBeenCalledTimes(1);

})

test("it tests that editUser from repository is called once",()=> {
    service.editUser({})
    expect(mockRepository.editUser).toHaveBeenCalledTimes(1)
})

test("it test that deleteUser from repository is called once",()=> {
    service.deleteUser(1)
    expect(mockRepository.deleteUser).toHaveBeenCalledTimes(1)
})

test("it test that getUserById from repository is called once",()=> {
    service.getUserById(1)
    expect(mockRepository.getUserById).toHaveBeenCalledTimes(1)
})












