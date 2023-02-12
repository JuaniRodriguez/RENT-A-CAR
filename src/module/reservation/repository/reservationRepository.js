module.exports= class reservationRepository {
    constructor(database) {
       this.tableName='reservation',
       this.database=database 
    }

    getReservations() {
        const data={
            car:"toyota"
        }
        return data
    }
}