const carsModule=require('../carsModule.js');

const mockContainer= {
    get:jest.fn()
}
const mockApp=jest.fn();
const mockCarsController={
    carRoutes:jest.fn()
};

mockContainer.get.mockImplementationOnce(() => mockCarsController);

test("it test initApp function",()=> {
    carsModule.initApp(mockApp,mockContainer)
    expect(mockContainer.get).toHaveBeenCalledTimes(1);
    expect(mockContainer.get).toHaveBeenCalledWith('carsController');
    expect(mockCarsController.carRoutes).toHaveBeenCalledWith(mockApp);
    expect(mockCarsController.carRoutes).toHaveBeenCalledTimes(1);
})

/*
npm run test -t carsModule.spec.js
*/

