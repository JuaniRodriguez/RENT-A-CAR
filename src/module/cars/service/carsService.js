module.exports= class carsService {

    constructor(carsRepository) {
        this.carsRepository=carsRepository
    }

    async getAllCars() {
        return this.carsRepository.getAllCars()
    }
    
    async createCar(carData) {
        return this.carsRepository.addCar(carData)

    }

    async editCar(id,cardData) {
        return await this.carsRepository.editCar(id,cardData)
    }

    async deleteCar(id) {
        return await this.carsRepository.deleteCar(id)
    }

    async getCarById(id) {
        return await this.carsRepository.getCarById(id);
    }

}