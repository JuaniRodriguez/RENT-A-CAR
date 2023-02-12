module.exports=class reservationService {
    constructor(reservationRepository) {
        this.reservationRepository=reservationRepository
    }

    async getReservations() {
        return this.reservationRepository.getReservations()
    }
}