module.exports= class rentsRepository {
    constructor(database) {
       this.tableName='rents',
       this.database=database 
    }

    getAllRents() {
        
        /*const carsData=`SELECT 
        id,
        fk_car,
        fk_user,
        startDate,
        finishDate,
        totalDays
        
        FROM ${this.tableName}
    `
    return this.database.prepare(carsData).all()*/
        const data=`SELECT
            rents.id,
            cars.brand,
            cars.model,
            cars.year,
            cars.kms,
            cars.color,
            cars.ac,
            cars.passengers,
            cars.transmission,
            cars.picture,
            cars.price,
            users.name,
            users.document,
            rents.startDate,
            rents.finishDate,
            rents.totalDays
            FROM rents
            INNER JOIN cars USING(id)
            INNER JOIN users USING(id) 
        `
        //console.log(this.database.prepare(data).get());
        return this.database.prepare(data).get()
    }

    addRent(rentData) {
        console.log(rentData);
        const data=`INSERT INTO ${this.tableName} (
            fk_car,
            fk_user,
            startDate,
            finishDate,
            totalDays
            )VALUES(
             ${rentData.car},
             ${rentData.user},
            '${rentData.startDate}',
            '${rentData.finishDate}',
             ${rentData.totalDays}
            )
    `
    //poner un try catch en caso de que no respete el foreign key
    //const result=this.database.prepare(data).run();
    return this.database.prepare(data).run()
    }

    editRent(rentData) {
        const updateRent=`UPDATE ${this.tableName} SET
            fk_car=${rentData.car},
            fk_user=${rentData.user},
            startDate='${rentData.startDate}',
            finishDate='${rentData.finishDate}',
            totalDays=${rentData.totalDays}
            WHERE id=${rentData.id}
        `
        
        console.log(this.database.prepare(updateRent).run())
    }

    deleteRent(id) {
        const rentToDelete=`DELETE FROM ${this.tableName} WHERE id=${id}`
        this.database.prepare(rentToDelete).run();
    }

    getRentById(id) {
        const rentData=`SELECT
            id,
            startDate,
            finishDate
            
            FROM ${this.tableName} WHERE id=?
        `
        
        const rent=this.database.prepare(rentData).get(id)
        return rent
    }

}