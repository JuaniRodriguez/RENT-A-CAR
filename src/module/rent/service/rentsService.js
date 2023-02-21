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

    async editRent(data) {
        return this.rentsRepository.editRent(data)
    }
    
    async deleteRent(id) {
        return this.rentsRepository.deleteRent(id)
    }

    async getRentById(id) {
        return this.rentsRepository.getRentById(id)
    }

}