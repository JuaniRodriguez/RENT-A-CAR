export class carsService {

    constructor(carRepository) {
        this.carRepository=carRepository
    }

    async getAllCars() {
        return this.carRepository.getAllCars()
    }
    
    async createCar(carData) {
        return this.carRepository.addCar(carData)

    }

    async editCar(id,cardData) {
        await this.carRepository.editCar(id,cardData)
    }

    async deleteCar(id) {
        await this.carRepository.deleteCar(id)
    }

    async getCarById(id) {
        await this.carRepository.getCarById(id)
    }

}