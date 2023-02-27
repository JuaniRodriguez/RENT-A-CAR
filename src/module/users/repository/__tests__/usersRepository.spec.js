const database=require('better-sqlite3');
const fs=require('fs');
const usersRepository=require('../usersRepository.js');

let mockDataBase;

beforeEach(() => {
    mockDataBase = new database(':memory:');
    const migration = fs.readFileSync('./data/sql/rent.sql', 'utf-8');
    mockDataBase.exec(migration);
});


test("it tests that a first user is added",()=> {
    const repository=new usersRepository(mockDataBase);
    const userData={name:"martin",surname:"palermo",age:40,phone:11456789,email:"martinpalermo@gmail.com",document:27789879};
    const user=repository.addUser(userData);
        expect(user.changes).toEqual(1);
        expect(user.lastInsertRowid).toEqual(1);
})


test("it tests that is possible to get a user by id",()=> {
    const repository=new usersRepository(mockDataBase);
    const userData={name:"martin",surname:"palermo",age:40,phone:11456789,email:"martinpalermo@gmail.com",document:27789879};
    repository.addUser(userData);
    const user=repository.getUserById(1);
        expect(user.name).toEqual("martin");
})


test("it tests that a user can be edited",()=> {
    const repository=new usersRepository(mockDataBase);
    const userData={name:"martin",surname:"palermo",age:40,phone:11456789,email:"martinpalermo@gmail.com",document:27789879};
    repository.addUser(userData);
    const userModified={id:1,name:"martin",surname:"palermo",age:42,phone:11456789,email:"martinpalermo@gmail.com",document:27789879};
    repository.editUser(userModified);
    const user=repository.getUserById(1)
        expect(user.age).toEqual("42");
})

test("it tests that a user is deleted",()=> {
    const repository=new usersRepository(mockDataBase);
    const userData={name:"martin",surname:"palermo",age:40,phone:11456789,email:"martinpalermo@gmail.com",document:27789879};
    repository.addUser(userData);
    repository.deleteUser(1);
    expect(repository.getUserById(1)).toBeUndefined()
})

test("it tests that getAllUsers brings all users",()=> {
    const repository=new usersRepository(mockDataBase);
    const userOne={name:"martin",surname:"palermo",age:40,phone:11456789,email:"martinpalermo@gmail.com",document:27789879};
    repository.addUser(userOne);
    const userTwo={name:"roman",surname:"riquelme",age:40,phone:11335789,email:"romanriquelme@gmail.com",document:27564789};
    repository.addUser(userTwo);
    expect(repository.getAllUsers()).toHaveLength(2)

})
