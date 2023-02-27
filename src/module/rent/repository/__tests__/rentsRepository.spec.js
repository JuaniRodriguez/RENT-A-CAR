const database=require('better-sqlite3');
const fs=require('fs');
const rentsRepository=require('../rentsRepository.js');
const carsRepository=require('../../../cars/repository/carsRepository.js');
const usersRepository=require('../../../users/repository/usersRepository.js');
let mockDataBase;

beforeEach(() => {
    mockDataBase = new database(':memory:');
    const migration = fs.readFileSync('./data/sql/rent.sql', 'utf-8');
    mockDataBase.exec(migration);
    const carsRepo=new carsRepository(mockDataBase);
    const usersRepo=new usersRepository(mockDataBase);
    carsRepo.addCar({brand:"toyota",model:"hilux",year:2022,kms:15000,color:"red",ac:"yes",passengers:6,transmission:"manual",picture:"",price:150});
    usersRepo.addUser({name:"martin",surname:"palermo",age:40,phone:11456789,email:"martinpalermo@gmail.com",document:27789879});

});


test("it tests that a first rent is added",()=> {
    const repository=new rentsRepository(mockDataBase);
    const rentData={car:1,user:1,startDate:"2023-02-27",finishDate:"2022-02-28",totalDays:1};
    const rent=repository.addRent(rentData);
        expect(rent.changes).toEqual(1);
        expect(rent.lastInsertRowid).toEqual(1);
})


test("it tests that is possible to get a rent by id",()=> {
    const repository=new rentsRepository(mockDataBase);
    const rentData={car:1,user:1,startDate:"2023-02-27",finishDate:"2022-02-28",totalDays:1};
    repository.addRent(rentData);
    const rent=repository.getRentById(1);
        expect(rent.startDate).toEqual("2023-02-27");
})


test("it tests that a rent can be edited",()=> {
    const repository=new rentsRepository(mockDataBase);
    const rentData={car:1,user:1,startDate:"2023-02-27",finishDate:"2023-02-28",totalDays:1};
    repository.addRent(rentData);
    const rentModified={id:1,car:1,user:1,startDate:"2023-02-27",finishDate:"2023-03-01",totalDays:2};
    repository.editRent(rentModified);
    const rent=repository.getRentById(1)
        expect(rent.finishDate).toEqual("2023-03-01");
})

test("it tests that a rent is deleted",()=> {
    const repository=new rentsRepository(mockDataBase);
    const rentData={car:1,user:1,startDate:"2023-02-27",finishDate:"2023-02-28",totalDays:1};
    repository.addRent(rentData);
    repository.deleteRent(1);
    expect(repository.getRentById(1)).toBeUndefined()
})

test("it tests that getAllRents brings all rents",()=> {
    const repository=new rentsRepository(mockDataBase);
    const carsRepo=new carsRepository(mockDataBase);
    carsRepo.addCar({brand:"toyota",model:"corolla",year:2021,kms:25000,color:"white",ac:"yes",passengers:5,transmission:"manual",picture:"",price:250});
    const rentOne={car:1,user:1,startDate:"2023-02-27",finishDate:"2023-02-28",totalDays:1};
    repository.addRent(rentOne);
    const rentTwo={car:2,user:1,startDate:"2023-02-27",finishDate:"2023-03-02",totalDays:3};
    repository.addRent(rentTwo);
    expect(repository.getAllRents()).toHaveLength(2)

})


