module.exports= class rentRepository {
    constructor(database) {
       this.tableName='rent',
       this.database=database 
    }

    getAllRents() {
        const carsData=`SELECT 
        id,
        car,
        name,
        date,
        days,
        price,
        total,
        FROM ${this.tableName}
    `
    return this.database.prepare(carsData).all()
    }

}