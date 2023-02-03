module.exports= class CarRepository {
    constructor(database) {
        this.tableName='cars',
        this.database=database;
    }
//ver si deberia crear una tabla

    getAllCars() {
        const carsData=`SELECT 
            id,
            brand,
            model,
            year,
            kms,
            color,
            airConditioner,
            passengers,
            manualAutomatic,
            image
            FROM ${this.tableName}
        `
        return this.database.prepare(carsData).all()
    }

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

    editCar(id,carData) {
        const updateCar=`UPDATE ${this.tableName} SET
            brand=${carData.brand},
            model=${carData.model},
            year=${carData.year},
            kms=${carData.kms},
            color=${carData.color},
            airConditioner=${carData.airConditioner},
            passengers=${carData.passengers},
            manualAutomatic=${carData.manualAutomatic},
            image=${carData.image}
            WHERE id=${id}
        `
        this.database.prepare(updateCar).run();
        
    }

    deleteCar(id) {
        const carToDelete=`DELETE FROM ${this.tableName} WHERE id=${id}`
        this.database.prepare(carToDelete).run();
        
    }

    getCarById(id) {
        const carData=`SELECT
            id,
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
}




//add car,edit car,delete car, 