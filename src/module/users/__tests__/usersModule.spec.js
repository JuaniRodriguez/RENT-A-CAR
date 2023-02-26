
const usersModule=require('../usersModule.js');

const mockContainer= {
    get:jest.fn()
}
const mockApp=jest.fn();
const mockUsersController={
    usersRoutes:jest.fn()
};

mockContainer.get.mockImplementationOnce(() => mockUsersController);

test("it test initApp function",()=> {
    usersModule.initUsers(mockApp,mockContainer)
    expect(mockContainer.get).toHaveBeenCalledTimes(1);
    expect(mockContainer.get).toHaveBeenCalledWith('usersController');
    expect(mockUsersController.usersRoutes).toHaveBeenCalledWith(mockApp);
    expect(mockUsersController.usersRoutes).toHaveBeenCalledTimes(1);
})

