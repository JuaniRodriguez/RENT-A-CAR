const database=require('better-sqlite3');
const fs=require('fs');
const carsRepository=require('../carsRepository.js')

let mockDataBase;

beforeEach(() => {
    mockDataBase = new database(':memory:');
    const migration = fs.readFileSync('./data/sql/rent.sql', 'utf-8');
    mockDataBase.exec(migration);
  });

test("it tests that a first car is added",()=> {
    const repository=new carsRepository(mockDataBase);
    const carData={brand:"toyota",model:"hilux",year:2022,kms:15000,color:"red",ac:"yes",passengers:6,transmission:"manual",picture:"",price:150};
    const car=repository.addCar(carData);
        expect(car.changes).toEqual(1);
        expect(car.lastInsertRowid).toEqual(1);
        //porque el run devuelve un objeto con changes y lastInsertRowid
})

test("it tests that is possible to get a car by id",()=> {
    const repository=new carsRepository(mockDataBase);
    const carData={brand:"toyota",model:"hilux",year:2022,kms:15000,color:"red",ac:"yes",passengers:6,transmission:"manual",picture:"",price:150};
    repository.addCar(carData);
    const car=repository.getCarById(1);
        expect(car).toEqual({id:1,...carData});
})

test("it tests that a car can be edited",()=> {
    const repository=new carsRepository(mockDataBase);
    const carData={brand:"toyota",model:"hilux",year:2022,kms:15000,color:"red",ac:"yes",passengers:6,transmission:"manual",picture:"",price:150};
    repository.addCar(carData);
    const carModified={id:1,brand:"toyota",model:"hilux",year:2022,kms:15000,color:"red",ac:"yes",passengers:6,transmission:"manual",picture:"",price:200};
    repository.editCar(carModified);
    const car=repository.getCarById(1)
        expect(car.price).toEqual(200);
})

test("it tests that a car is deleted",()=> {
    const repository=new carsRepository(mockDataBase);
    const carData={brand:"toyota",model:"hilux",year:2022,kms:15000,color:"red",ac:"yes",passengers:6,transmission:"manual",picture:"",price:150};
    repository.addCar(carData);
    repository.deleteCar(1);
    expect(repository.getCarById(1)).toBeUndefined()
})

test("it tests that getAllCars brings all cars",()=> {
    const repository=new carsRepository(mockDataBase);
    const carOne={brand:"toyota",model:"hilux",year:2022,kms:15000,color:"red",ac:"yes",passengers:6,transmission:"manual",picture:"",price:150};
    repository.addCar(carOne);
    const carTwo={brand:"toyota",model:"corolla",year:2021,kms:15000,color:"white",ac:"yes",passengers:5,transmission:"manual",picture:"",price:200};
    repository.addCar(carTwo);
    expect(repository.getAllCars()).toHaveLength(2)

})

/*
npm run test -t carsRepository.spec.js 
*/