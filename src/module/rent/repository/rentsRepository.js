module.exports= class rentsRepository {
    constructor(database) {
       this.tableName='rents',
       this.database=database 
    }

    getAllRents() {
        
        const carsData=`SELECT 
        id,
        fk_car,
        fk_user,
        startDate,
        finishDate,
        totalDays
        
        FROM ${this.tableName}
    `
    return this.database.prepare(carsData).all()
        /*const data=`SELECT
            brand,
            model,
            year
            FROM cars
            INNER JOIN users
            USING(id)
        `
        
        console.log(this.database.prepare(data).get());
        return this.database.prepare(data).get()
        */
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

}