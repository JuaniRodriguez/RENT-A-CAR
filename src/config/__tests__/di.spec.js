require('dotenv').config();
const configureDI = require('../di.js');

const container = configureDI();

test("it tests if common definitions are added to the container",()=> {
    expect(container.get('runDatabase')).toBeDefined()
    expect(container.get('uploadImages')).toBeDefined()
    expect(container.get('session')).toBeDefined()
})

test("it tests if cars definitions are added to the container",()=> {
    expect(container.get('carsController')).toBeDefined()
    expect(container.get('carsService')).toBeDefined()
    expect(container.get('carsRepository')).toBeDefined()
})

test("it tests if users definitions are added to the container",()=> {
    expect(container.get('usersController')).toBeDefined()
    expect(container.get('usersService')).toBeDefined()
    expect(container.get('usersRepository')).toBeDefined()
})

test("it tests if rents definitions are added to the container",()=> {
    expect(container.get('rentsController')).toBeDefined()
    expect(container.get('rentsService')).toBeDefined()
    expect(container.get('rentsRepository')).toBeDefined()
})
