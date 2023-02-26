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

/*
npm run test -t di.spec.js
*/

/*
describe('DI is loading the right dependencies', () => {
  const container = configureDI();
  //const { definitions } = container;

  test('DI is loading the right top level dependencies', () => {
    expect(container).toHaveProperty('carsController');
    expect(container).toHaveProperty('carsService');
    expect(container).toHaveProperty('CarRepository');
    expect(container).toHaveProperty('CarModel');
    expect(container).toHaveProperty('UserController');
    expect(container).toHaveProperty('UserService');
    expect(container).toHaveProperty('UserRepository');
    expect(container).toHaveProperty('UserModel');
    expect(container).toHaveProperty('ReservationController');
    expect(container).toHaveProperty('ReservationService');
    expect(container).toHaveProperty('ReservationRepository');
    expect(container).toHaveProperty('ReservationModel');
  })*/
/*
  test('CarService is constructed with the right dependencies', () => {
    const { CarService } = definitions;
    const expected = [expect.objectContaining({ existingDefinitionName: 'CarRepository' })];
    expect(CarService.deps).toEqual(expect.arrayContaining(expected));
  });
*/
