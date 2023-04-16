const {fromModelToEntity}=require('../mapper/carMapper.js')

module.exports= class CarRepository {
    constructor(carModel) {
        this.carModel=carModel
    }   

    async getAllCars() {
        console.log("calling")
        const cars=await this.carModel.findAll();
        console.log(cars)
        return cars.map(car=>fromModelToEntity(car))
        //const newCars=cars.map(car=>fromModelToEntity(car))
        //console.log(newCars)
        //return newCars
    }
    
        /*
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
            picture,
            price
            FROM ${this.tableName}
        `
        return this.database.prepare(carsData).all()
        */

    async addCar(carData) {

        await this.carModel.create(carData)
        return fromModelToEntity(carData) 
    }
        /*
        const data=`INSERT INTO ${this.tableName} (
                brand,
                model,
                year,
                kms,
                color,
                ac,
                passengers,
                transmission,
                picture,
                price
                )VALUES(
                '${carData.brand}',
                '${carData.model}',
                ${carData.year},
                ${carData.kms},
                '${carData.color}',
                '${carData.ac}',
                ${carData.passengers},
                '${carData.transmission}',
                '${carData.picture}',
                '${carData.price}'
                )
        `
        return this.database.prepare(data).run();
        */

    async editCar(carData) {

        await this.carModel.update(carData,{
            where: {
                id:carData.id
            }
        })
        /*
        const updateCar=`UPDATE ${this.tableName} SET
            brand='${carData.brand}',
            model='${carData.model}',
            year='${carData.year}',
            kms='${carData.kms}',
            color='${carData.color}',
            ac='${carData.ac}',
            passengers='${carData.passengers}',
            transmission='${carData.transmission}',
            picture='${carData.picture}',
            price='${carData.price}'
            WHERE id=${carData.id}
        `
        //const response=this.database.prepare(updateCar).run();
        //console.log(response);
         return this.database.prepare(updateCar).run()
         */
    }

    async deleteCar(carId) {

        await this.carModel.destroy({
            where: {
                id:carId
            }
        })
        //const carToDelete=`DELETE FROM ${this.tableName} WHERE id=${id}`
        //this.database.prepare(carToDelete).run();
    }


    async getCarById(id) {

        const car=await this.carModel.findByPk(id);
        return fromModelToEntity(car)
        /*
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
            price
            FROM ${this.tableName} WHERE id=?
        `
        
        const car=this.database.prepare(carData).get(id);
        return car
        */
    }
}



