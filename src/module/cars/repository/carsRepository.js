const { response } = require("express");

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
            ac,
            passengers,
            transmission,
            picture
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
                ac,
                passengers,
                transmission,
                picture
                )VALUES(
                '${carData.brand}',
                '${carData.model}',
                ${carData.year},
                ${carData.kms},
                '${carData.color}',
                '${carData.ac}',
                ${carData.passengers},
                '${carData.transmission}',
                '${carData.picture}'
                )
        `
        const result=this.database.prepare(data).run();
        //return getCarById(result.lastInsertRowId)
        return response.lastInsertRowid
    }

    editCar(id,carData) {
        const updateCar=`UPDATE ${this.tableName} SET
            brand=${carData.brand},
            model=${carData.model},
            year=${carData.year},
            kms=${carData.kms},
            color=${carData.color},
            ac=${carData.ac},
            passengers=${carData.passengers},
            transmission=${carData.transmission},
            picture=${carData.picture}
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
            ac,
            passengers,
            transmission,
            picture,
            FROM ${this.tableName} where id=?
        `
        const car=this.database.prepare(carData).get(id)
        return car;
    }
}




//add car,edit car,delete car, 