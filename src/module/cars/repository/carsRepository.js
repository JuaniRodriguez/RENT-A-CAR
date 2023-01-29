export class CarRepository {
    constructor(database) {
        this.tableName='cars',
        this.database=database;
    }
//ver si deberia crear una tabla
    addCar(carData) {//tengo que chequear si ya existe el id
        const data=`INSERT INTO ${this.tableName} (
                brand,
                model,
                year,
                kms,
                color,
                airConditioner,
                passengers,
                manualAutomatic,
                image
                )VALUES(
                ${carData.brand},
                ${carData.model},
                ${carData.year},
                ${carData.kms},
                ${carData.color},
                ${carData.airConditioner},
                ${carData.passengers},
                ${carData.manualAutomatic},
                ${carData.image}
                )
        `
        const result=this.database.prepare(data).run();
        return getCarById(result.lastInsertRowId)
    }

}

function getCarById(id) {
    const carData=`SELECT
        brand,
        model,
        year,
        kms,
        color,
        airConditioner,
        passengers,
        manualAutomatic,
        image,
        FROM ${this.tableName} where id=?
    `
    const car=this.database.prepare(carData).get(id)
    return car;
}


//add car,edit car,delete car, 