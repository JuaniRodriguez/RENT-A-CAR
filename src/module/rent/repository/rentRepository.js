module.exports= class rentRepository {
    constructor(database) {
       this.tableName='rent',
       this.database=database 
    }

    getRents() {
        const data={
            car:"toyota"
        }
        return data
    }
}