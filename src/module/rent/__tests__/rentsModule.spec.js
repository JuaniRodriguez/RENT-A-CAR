const rentsModule=require('../rentsModule.js');

const mockContainer= {
    get:jest.fn()
}
const mockApp=jest.fn();
const mockRentsController={
    rentRoutes:jest.fn()
};

mockContainer.get.mockImplementationOnce(() => mockRentsController);

test("it test initApp function",()=> {
    rentsModule.initRent(mockApp,mockContainer)
    expect(mockContainer.get).toHaveBeenCalledTimes(1);
    expect(mockContainer.get).toHaveBeenCalledWith('rentsController');
    expect(mockRentsController.rentRoutes).toHaveBeenCalledWith(mockApp);
    expect(mockRentsController.rentRoutes).toHaveBeenCalledTimes(1);
})


