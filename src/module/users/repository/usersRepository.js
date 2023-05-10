

module.exports=class UsersRepository {
    constructor(userModel) {
        this.tableName='users',
        this.database=database
    }

    getAllUsers() {
        const usersData=`SELECT 
            id,
            name,
            surname,
            age,
            phone,
            email,
            document
            FROM ${this.tableName}
        `
           // console.log(this.database.prepare(usersData).all())
        return this.database.prepare(usersData).all()
    }

    addUser(userData) {//tengo que chequear si ya existe el id
        //console.log(userData)
        const data=`INSERT INTO ${this.tableName} (
                name,
                surname,
                age,
                phone,
                email,
                document
                )VALUES(
                '${userData.name}',
                '${userData.surname}',
                ${userData.age},
                ${userData.phone},
                '${userData.email}',
                '${userData.document}'
                )
        `
        //const result=this.database.prepare(data).run();
       return this.database.prepare(data).run()

        //return getuserById(result.lastInsertRowId)
        //return response.lastInsertRowid
        
    }

    editUser(userData) {
        //const newId=Number(userData.id);
        console.log(userData)

        const updateUser=`UPDATE ${this.tableName} SET
            name='${userData.name}',
            surname='${userData.surname}',
            age='${userData.age}',
            phone='${userData.phone}',
            email='${userData.email}',
            document='${userData.document}'
            WHERE id=${userData.id}
        `
        
        this.database.prepare(updateUser).run()
    }

    deleteUser(id) {
        const userToDelete=`DELETE FROM ${this.tableName} WHERE id=${id}`
        this.database.prepare(userToDelete).run();
        
    }

    getUserById(id) {
        console.log(id)
        const userData=`SELECT
            id,
            name,
            surname,
            age,
            phone,
            email,
            document
            FROM ${this.tableName} WHERE id=?
        `
        
        const user=this.database.prepare(userData).get(id)
        return user
    }
}
