module.exports=class rentService {
    constructor(rentRepository) {
        this.rentRepository=rentRepository
    }

    async getRents() {
        return this.rentRepository.getRents()
    }
}