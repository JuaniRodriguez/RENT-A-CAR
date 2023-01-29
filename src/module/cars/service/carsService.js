export class carsService {

    constructor(carRepository) {
        this.carRepository=carRepository
    }

    async createCar(carData) {
        return this.carRepository.addCar(carData)

    }

}