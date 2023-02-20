module.exports=class rentsService {
    constructor(rentsRepository) {
        this.rentsRepository=rentsRepository
    }

    async getAllRents() {
        return this.rentsRepository.getAllRents()
    }
    async addRent(data) {
        return this.rentsRepository.addRent(data)
    }
}