module.exports=class UsersRepository {
    constructor(database) {
        this.tableName='users',
        this.database=database
    }

    getAllUsers() {
        const usersData=`SELECT 
            name,
            surname,
            age,
            phone,
            email,
            document,
            FROM ${this.tableName}
        `
        return this.database.prepare(usersData).all()
    }

    adduser(userData) {//tengo que chequear si ya existe el id
        const data=`INSERT INTO ${this.tableName} (
                name,
                surname,
                age,
                phone,
                email,
                document,
                )VALUES(
                '${userData.name}',
                '${userData.surname}',
                ${userData.age},
                ${userData.phone},
                '${userData.email}',
                '${userData.document}'
                )
        `
        const result=this.database.prepare(data).run();
        //return getuserById(result.lastInsertRowId)
        return response.lastInsertRowid
    }

    edituser(userData) {
        const newId=Number(userData.id);
        const updateUser=`UPDATE ${this.tableName} SET
            name='${userData.name}',
            surname='${userData.surname}',
            age='${userData.age}',
            phone='${userData.phone}',
            email='${userData.email}',
            document='${userData.document}'
            WHERE id=${newId}
        `
        
        console.log(this.database.prepare(updateUser).run())
    }

    deleteUser(id) {
        const userToDelete=`DELETE FROM ${this.tableName} WHERE id=${id}`
        this.database.prepare(userToDelete).run();
        
    }

    getUserById(id) {
        console.log(id)
        const userData=`SELECT
            name,
            surname,
            age,
            phone,
            email,
            document,
            FROM ${this.tableName} WHERE id=?
        `
        
        const user=this.database.prepare(userData).get(id)
        return user
    }
}
